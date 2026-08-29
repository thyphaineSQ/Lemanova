// Widget de chat Lemany — bulle flottante présente sur toutes les pages.
// Appelle /api/chat (fonction serverless) ; aucune clé API côté client.
(function () {
  "use strict";

  var API_URL = "/api/chat";
  var STORAGE_KEY = "lemanyChatHistory";
  var GREETING =
    "Bonjour, je suis l'assistant Lemany. Posez-moi vos questions sur nos services (site web, SEO, automatisation, IA…), ou laissez-moi vos coordonnées pour être recontacté.";

  var css = [
    "#lmy-chat-btn{position:fixed;right:22px;bottom:22px;width:58px;height:58px;border-radius:50%;",
    "background:#4318ff;border:none;cursor:pointer;box-shadow:0 12px 28px rgba(10,0,60,.35);",
    "display:flex;align-items:center;justify-content:center;z-index:9999;transition:transform .15s}",
    "#lmy-chat-btn:hover{transform:scale(1.06)}",
    "#lmy-chat-btn svg{width:26px;height:26px}",
    "#lmy-chat-panel{position:fixed;right:22px;bottom:92px;width:360px;max-width:calc(100vw - 32px);",
    "height:520px;max-height:calc(100vh - 140px);max-height:calc(100dvh - 140px);background:#fff;border-radius:18px;",
    "box-shadow:0 24px 60px rgba(10,0,60,.28);display:none;flex-direction:column;overflow:hidden;",
    "z-index:9999;font-family:'Archivo',sans-serif}",
    "#lmy-chat-panel.lmy-open{display:flex}",
    "#lmy-chat-head{background:linear-gradient(135deg,#4318ff,#2b06a8);color:#fff;padding:16px 18px;",
    "display:flex;align-items:center;justify-content:space-between;flex:none}",
    "#lmy-chat-head strong{font:800 15px 'Archivo',sans-serif}",
    "#lmy-chat-head span{display:block;font:500 11px 'Archivo',sans-serif;color:rgba(255,255,255,.75);margin-top:2px}",
    "#lmy-chat-close{background:none;border:none;color:#fff;font-size:20px;cursor:pointer;line-height:1;padding:4px}",
    "#lmy-chat-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f7f6f2;",
    "-webkit-overflow-scrolling:touch}",
    ".lmy-msg{max-width:85%;padding:10px 13px;border-radius:14px;font:500 13.5px/1.5 'Archivo',sans-serif;white-space:pre-wrap;word-wrap:break-word}",
    ".lmy-msg.lmy-user{align-self:flex-end;background:#4318ff;color:#fff;border-bottom-right-radius:4px}",
    ".lmy-msg.lmy-bot{align-self:flex-start;background:#fff;color:#141414;border:1px solid #e9e4ff;border-bottom-left-radius:4px}",
    ".lmy-msg.lmy-error{align-self:flex-start;background:#ffe4d6;color:#7c2d12;border-bottom-left-radius:4px}",
    "#lmy-typing{align-self:flex-start;font:500 12px 'Archivo',sans-serif;color:#8a8a8a;padding:0 4px}",
    "#lmy-chat-form{flex:none;display:flex;gap:8px;padding:12px;padding-bottom:calc(12px + env(safe-area-inset-bottom));border-top:1px solid #eee;background:#fff}",
    "#lmy-chat-input{flex:1;resize:none;border:1px solid #ddd;border-radius:12px;padding:9px 12px;",
    "font:500 16px 'Archivo',sans-serif;max-height:80px;outline:none}",
    "#lmy-chat-input:focus{border-color:#4318ff}",
    "#lmy-chat-send{background:#c8ff2e;border:none;border-radius:12px;padding:0 16px;font:700 13px 'Archivo',sans-serif;",
    "color:#141414;cursor:pointer;flex:none}",
    "#lmy-chat-send:disabled{opacity:.5;cursor:default}",
    "@media (max-width:480px){#lmy-chat-panel{top:0;right:0;bottom:0;left:0;width:auto;max-width:none;",
    "height:auto;max-height:none;border-radius:0}",
    "#lmy-chat-head{padding-top:calc(16px + env(safe-area-inset-top))}}",
  ].join("");

  function injectStyles() {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function loadHistory() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory(history) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-40)));
    } catch (e) {
      /* stockage indisponible (navigation privée…) : on continue sans persister */
    }
  }

  function build() {
    injectStyles();

    var btn = document.createElement("button");
    btn.id = "lmy-chat-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Ouvrir le chat Lemany");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-1L3 20l1.1-3.9A8.5 8.5 0 1 1 21 11.5Z"></path></svg>';

    var panel = document.createElement("div");
    panel.id = "lmy-chat-panel";
    panel.innerHTML =
      '<div id="lmy-chat-head">' +
      "<div><strong>Lemany</strong><span>Généralement en ligne</span></div>" +
      '<button id="lmy-chat-close" type="button" aria-label="Fermer le chat">&times;</button>' +
      "</div>" +
      '<div id="lmy-chat-msgs"></div>' +
      '<form id="lmy-chat-form">' +
      '<textarea id="lmy-chat-input" rows="1" placeholder="Écrivez votre message…" maxlength="4000"></textarea>' +
      '<button id="lmy-chat-send" type="submit">Envoyer</button>' +
      "</form>";

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    var msgsEl = panel.querySelector("#lmy-chat-msgs");
    var formEl = panel.querySelector("#lmy-chat-form");
    var inputEl = panel.querySelector("#lmy-chat-input");
    var sendEl = panel.querySelector("#lmy-chat-send");
    var closeEl = panel.querySelector("#lmy-chat-close");

    var history = loadHistory();

    function addBubble(role, text) {
      var div = document.createElement("div");
      div.className = "lmy-msg " + (role === "user" ? "lmy-user" : role === "error" ? "lmy-error" : "lmy-bot");
      div.textContent = text;
      msgsEl.appendChild(div);
      msgsEl.scrollTop = msgsEl.scrollHeight;
      return div;
    }

    function renderHistory() {
      msgsEl.innerHTML = "";
      if (history.length === 0) {
        addBubble("assistant", GREETING);
      } else {
        history.forEach(function (m) {
          addBubble(m.role, m.content);
        });
      }
    }

    function setTyping(on) {
      var existing = document.getElementById("lmy-typing");
      if (on && !existing) {
        var p = document.createElement("div");
        p.id = "lmy-typing";
        p.textContent = "Lemany écrit…";
        msgsEl.appendChild(p);
        msgsEl.scrollTop = msgsEl.scrollHeight;
      } else if (!on && existing) {
        existing.remove();
      }
    }

    async function sendMessage(text) {
      history.push({ role: "user", content: text });
      addBubble("user", text);
      saveHistory(history);

      sendEl.disabled = true;
      setTyping(true);

      try {
        var res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history,
            pageUrl: window.location.href,
          }),
        });
        var data = await res.json().catch(function () {
          return {};
        });

        setTyping(false);

        if (!res.ok || !data.reply) {
          addBubble("error", data.error || "Une erreur est survenue, réessayez dans un instant.");
          return;
        }

        history.push({ role: "assistant", content: data.reply });
        addBubble("assistant", data.reply);
        saveHistory(history);
      } catch (err) {
        setTyping(false);
        addBubble("error", "Connexion impossible. Vérifiez votre réseau et réessayez.");
      } finally {
        sendEl.disabled = false;
      }
    }

    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = inputEl.value.trim();
      if (!text || sendEl.disabled) return;
      inputEl.value = "";
      inputEl.style.height = "auto";
      sendMessage(text);
    });

    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formEl.requestSubmit();
      }
    });

    inputEl.addEventListener("input", function () {
      inputEl.style.height = "auto";
      inputEl.style.height = Math.min(inputEl.scrollHeight, 80) + "px";
    });

    function openPanel() {
      panel.classList.add("lmy-open");
      if (msgsEl.children.length === 0) renderHistory();
      inputEl.focus();
    }
    function closePanel() {
      panel.classList.remove("lmy-open");
    }

    btn.addEventListener("click", function () {
      if (panel.classList.contains("lmy-open")) closePanel();
      else openPanel();
    });
    closeEl.addEventListener("click", closePanel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
