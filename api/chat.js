// Backend du chatbot Lemany : reçoit les messages du widget (chatbot-widget.js),
// interroge Claude (avec recherche web) et déclenche l'email de lead / l'alerte
// Slack quand le modèle appelle les outils correspondants.
import Anthropic from "@anthropic-ai/sdk";

export const config = { maxDuration: 30 };

const anthropic = new Anthropic();

const MODEL = "claude-opus-5";
const MAX_TOOL_ITERATIONS = 6;
const MAX_MESSAGES = 40;
const MAX_MESSAGE_CHARS = 4000;

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Lemany, une agence basée Rue de Bourg à Lausanne qui accompagne les PME de Suisse romande (Lausanne, Genève, Nyon, Vaud, La Côte).

Services de Lemany : création de site internet, refonte de site, référencement SEO (dont SEO local), automatisation par IA, automatisation des processus, logiciels métier, CRM sur mesure, systèmes de réservation, portails clients, MVP pour startups, produits SaaS, applications web sur mesure, maintenance & évolution.

Ta mission :
1. Réponds aux questions des visiteurs sur les services, la démarche et les sujets liés (site web, SEO, automatisation, IA) avec précision et concision. Utilise la recherche web si une question porte sur une info actuelle, un sujet externe, ou hors de ta connaissance.
2. Quand c'est pertinent, propose l'appel découverte gratuit de 30 minutes qui débouche sur un plan d'action écrit sous 48h (page contact.html).
3. Dès qu'un visiteur montre un intérêt réel (donne un email/téléphone, demande à être recontacté, décrit un projet concret), appelle l'outil capture_lead pour transmettre ses coordonnées à l'équipe. Ne l'invente jamais : demande-les si besoin.
4. Si tu ne peux pas répondre avec certitude (tarif précis pour un cas particulier, question hors sujet, demande complexe nécessitant un humain), appelle l'outil escalate_question puis informe le visiteur qu'un membre de l'équipe le recontactera.

Ton : professionnel, chaleureux, concis (2 à 4 phrases, ou une liste courte si plus clair). Réponds dans la langue utilisée par le visiteur (français par défaut). Ne prétends jamais avoir transmis une information sans avoir réellement appelé l'outil correspondant.`;

const TOOLS = [
  {
    type: "web_search_20260209",
    name: "web_search",
    max_uses: 3,
  },
  {
    name: "capture_lead",
    description:
      "Enregistre les coordonnées d'un visiteur intéressé pour que l'équipe Lemany le recontacte. À utiliser dès qu'un email ou un téléphone est fourni, ou qu'une demande de rappel/rendez-vous est exprimée.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Nom du visiteur, si connu" },
        email: { type: "string", description: "Email du visiteur, si connu" },
        phone: { type: "string", description: "Téléphone du visiteur, si connu" },
        company: { type: "string", description: "Entreprise du visiteur, si mentionnée" },
        summary: { type: "string", description: "Résumé du besoin exprimé par le visiteur" },
      },
      required: ["summary"],
    },
  },
  {
    name: "escalate_question",
    description:
      "Transmet à l'équipe Lemany une question à laquelle tu ne peux pas répondre avec certitude. N'utilise cet outil qu'après avoir essayé de répondre, y compris avec une recherche web si pertinent.",
    input_schema: {
      type: "object",
      properties: {
        question: { type: "string", description: "La question du visiteur, telle quelle" },
        reason: { type: "string", description: "Pourquoi tu ne peux pas y répondre avec certitude" },
      },
      required: ["question", "reason"],
    },
  },
];

function setCors(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "https://lemany.ch";
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin === allowedOrigin ? origin : allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return "messages manquant";
  if (messages.length > MAX_MESSAGES) return "conversation trop longue";
  for (const m of messages) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) return "message invalide";
    if (typeof m.content !== "string" || m.content.length === 0) return "contenu de message invalide";
    if (m.content.length > MAX_MESSAGE_CHARS) return "message trop long";
  }
  if (messages[messages.length - 1].role !== "user") return "le dernier message doit venir du visiteur";
  return null;
}

async function sendLeadEmail(lead, pageUrl) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante — email de lead non envoyé", lead);
    return;
  }
  const to = process.env.LEAD_EMAIL_TO || "thyphaine.dierickx@gmail.com";
  const from = process.env.RESEND_FROM_EMAIL || "Lemany Chatbot <onboarding@resend.dev>";
  const lines = [
    lead.name && `Nom : ${lead.name}`,
    lead.email && `Email : ${lead.email}`,
    lead.phone && `Téléphone : ${lead.phone}`,
    lead.company && `Entreprise : ${lead.company}`,
    `Besoin : ${lead.summary}`,
    pageUrl && `Page : ${pageUrl}`,
  ].filter(Boolean).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: lead.email || undefined,
        subject: `Nouveau contact chatbot — ${lead.name || lead.email || "visiteur"}`,
        text: lines,
      }),
    });
    if (!res.ok) console.error("Resend a répondu", res.status, await res.text());
  } catch (err) {
    console.error("Erreur envoi email lead:", err);
  }
}

async function sendSlackAlert(payload, pageUrl) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) {
    console.error("SLACK_WEBHOOK_URL manquante — alerte non envoyée", payload);
    return;
  }
  const text = [
    ":question: *Question non résolue par le chatbot Lemany*",
    `*Question :* ${payload.question}`,
    `*Raison :* ${payload.reason}`,
    pageUrl && `*Page :* ${pageUrl}`,
  ].filter(Boolean).join("\n");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) console.error("Slack webhook a répondu", res.status, await res.text());
  } catch (err) {
    console.error("Erreur envoi Slack:", err);
  }
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée" });
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY manquante");
    res.status(500).json({ error: "Le chatbot n'est pas configuré." });
    return;
  }

  const { messages, pageUrl } = req.body || {};
  const validationError = validateMessages(messages);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const safePageUrl = typeof pageUrl === "string" ? pageUrl.slice(0, 300) : undefined;
  const conversation = messages.map((m) => ({ role: m.role, content: m.content }));

  try {
    let finalText = "";

    for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
      const response = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 1500,
        system: safePageUrl
          ? `${SYSTEM_PROMPT}\n\nLe visiteur se trouve actuellement sur : ${safePageUrl}`
          : SYSTEM_PROMPT,
        output_config: { effort: "low" },
        tools: TOOLS,
        messages: conversation,
      });

      conversation.push({ role: "assistant", content: response.content });

      if (response.stop_reason !== "tool_use") {
        finalText = response.content
          .filter((b) => b.type === "text")
          .map((b) => b.text)
          .join("\n")
          .trim();
        break;
      }

      const toolUseBlocks = response.content.filter((b) => b.type === "tool_use");
      const toolResults = [];

      for (const block of toolUseBlocks) {
        if (block.name === "capture_lead") {
          await sendLeadEmail(block.input, safePageUrl);
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: "Coordonnées transmises à l'équipe Lemany.",
          });
        } else if (block.name === "escalate_question") {
          await sendSlackAlert(block.input, safePageUrl);
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: "Question transmise à l'équipe Lemany.",
          });
        }
        // Les tool_use du web_search server-side sont déjà résolus par l'API,
        // rien à faire de notre côté pour ceux-ci.
      }

      if (toolResults.length === 0) break;
      conversation.push({ role: "user", content: toolResults });
    }

    res.status(200).json({
      reply: finalText || "Désolé, je n'ai pas pu formuler de réponse. Un membre de l'équipe reviendra vers vous.",
    });
  } catch (err) {
    console.error("Erreur chatbot:", err);
    res.status(500).json({ error: "Le chatbot est momentanément indisponible." });
  }
}
