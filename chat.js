// ==========================================================
// Assistant virtuel AMDNA — bulle de discussion en bas à droite.
// Parle à la fonction Supabase "chat-assistant" (voir SETUP.md §10).
// ==========================================================
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";

const ENDPOINT = `${SUPABASE_URL}/functions/v1/chat-assistant`;
const PHONE = "06 56 73 46 80";
const WELCOME = "Bonjour 👋 Je suis l'assistant AMDNA. Une question sur le nettoyage de votre bateau ou de votre voiture ? Je vous réponds tout de suite.";
const SUGGESTIONS = [
  "Combien coûte le nettoyage d'un bateau ?",
  "Quels sont vos tarifs auto ?",
  "Vous vous déplacez à domicile ?",
  "Je veux réserver",
];

const history = []; // { role: "user" | "assistant", content }
let busy = false;

// ---------- Construction de la bulle ----------
const root = document.createElement("div");
root.className = "amdna-chat";
root.innerHTML = `
  <button class="amdna-chat-launcher" type="button" aria-label="Ouvrir l'assistant AMDNA" aria-expanded="false">
    <svg class="ico-open" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3 0-1.3-.6V16A2.5 2.5 0 0 1 4 13.5v-8Z" fill="currentColor"/></svg>
    <svg class="ico-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
  </button>
  <section class="amdna-chat-panel" role="dialog" aria-label="Assistant AMDNA" hidden>
    <header class="amdna-chat-head">
      <div>
        <p class="amdna-chat-eyebrow">AMDNA · ASSISTANT</p>
        <strong>Une question ?</strong>
      </div>
      <button class="amdna-chat-x" type="button" aria-label="Fermer">×</button>
    </header>
    <div class="amdna-chat-log" aria-live="polite"></div>
    <div class="amdna-chat-chips"></div>
    <form class="amdna-chat-form">
      <input type="text" name="q" autocomplete="off" maxlength="600" placeholder="Écrivez votre question…" aria-label="Votre message">
      <button type="submit" aria-label="Envoyer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </form>
    <p class="amdna-chat-foot">Assistant automatique · Devis : <a href="tel:0656734680">${PHONE}</a></p>
  </section>`;
document.body.appendChild(root);

const launcher = root.querySelector(".amdna-chat-launcher");
const panel = root.querySelector(".amdna-chat-panel");
const log = root.querySelector(".amdna-chat-log");
const chips = root.querySelector(".amdna-chat-chips");
const form = root.querySelector(".amdna-chat-form");
const input = form.querySelector("input");

// ---------- Ouverture / fermeture ----------
function setOpen(open) {
  panel.hidden = !open;
  root.classList.toggle("is-open", open);
  launcher.setAttribute("aria-expanded", String(open));
  if (open) {
    if (!log.children.length) {
      addBubble("assistant", WELCOME);
      renderChips();
    }
    setTimeout(() => input.focus(), 50);
  }
}
launcher.addEventListener("click", () => setOpen(panel.hidden));
root.querySelector(".amdna-chat-x").addEventListener("click", () => setOpen(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) setOpen(false); });

// ---------- Affichage des messages ----------
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function format(text) {
  // Gras **x**, liens téléphone et e-mail, retours à la ligne
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/0\d(?:[ .]?\d{2}){4}/g, (m) => `<a href="tel:${m.replace(/\D/g, "")}">${m}</a>`)
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, (m) => `<a href="mailto:${m}">${m}</a>`)
    .replace(/\n/g, "<br>");
}
function addBubble(role, text, bookService) {
  const b = document.createElement("div");
  b.className = `amdna-msg amdna-msg-${role}`;
  b.innerHTML = format(text);
  if (bookService) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "amdna-chat-book";
    btn.innerHTML = bookService === "nautic" ? "Demander un devis nautic <span>↗</span>" : "Réserver un nettoyage auto <span>↗</span>";
    btn.addEventListener("click", () => openBooking(bookService));
    b.appendChild(btn);
  }
  log.appendChild(b);
  log.scrollTop = log.scrollHeight;
  return b;
}
function renderChips() {
  chips.innerHTML = "";
  SUGGESTIONS.forEach((s) => {
    const c = document.createElement("button");
    c.type = "button";
    c.textContent = s;
    c.addEventListener("click", () => send(s));
    chips.appendChild(c);
  });
}

// Ouvre le formulaire de réservation existant du site
function openBooking(service) {
  const btn = document.querySelector(`.open-booking[data-service="${service}"]`);
  if (btn) {
    setOpen(false);
    btn.click();
  } else {
    location.hash = service === "nautic" ? "#nautic" : "#auto";
  }
}

// ---------- Envoi ----------
async function send(text) {
  text = (text || "").trim();
  if (!text || busy) return;
  busy = true;
  chips.innerHTML = "";
  input.value = "";
  addBubble("user", text);
  history.push({ role: "user", content: text });

  const typing = addBubble("assistant", "");
  typing.classList.add("is-typing");
  typing.innerHTML = "<span></span><span></span><span></span>";

  let reply = "";
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
      body: JSON.stringify({ messages: history.slice(-12) }),
    });
    const data = await res.json().catch(() => ({}));
    reply = data.reply || "";
  } catch (_) { /* réseau */ }

  typing.remove();
  if (!reply) {
    history.pop();
    addBubble("assistant", `Désolé, je rencontre un petit souci technique. Vous pouvez nous joindre directement au ${PHONE} ou via le bouton Réserver du site.`);
  } else {
    let book = null;
    if (reply.includes("[RESERVER_NAUTIC]")) book = "nautic";
    else if (reply.includes("[RESERVER_AUTO]")) book = "auto";
    const clean = reply.replace(/\[RESERVER_(AUTO|NAUTIC)\]/g, "").trim();
    history.push({ role: "assistant", content: clean });
    addBubble("assistant", clean, book);
  }
  busy = false;
  input.focus();
}
form.addEventListener("submit", (e) => { e.preventDefault(); send(input.value); });
