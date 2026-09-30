// ==========================================================
// Edge Function : chat-assistant
// L'assistant virtuel AMDNA qui répond aux clients sur le site.
// ==========================================================
// Secret nécessaire (Supabase → Edge Functions → Secrets) :
//   ANTHROPIC_API_KEY   (ta clé API Claude, commence par sk-ant-...)
// Déploiement : voir SETUP.md, section 10.
// IMPORTANT : désactiver "Verify JWT" pour cette fonction.
// ==========================================================

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
const MODEL = "claude-haiku-4-5-20251001"; // modèle rapide et économique

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ----------------------------------------------------------
// Tout ce que l'assistant sait sur AMDNA.
// Pour changer une info (prestation, horaires, prix…), modifie
// ce texte puis redéploie la fonction.
// ----------------------------------------------------------
const SYSTEM_PROMPT = `Tu es l'assistant virtuel d'AMDNA, entreprise de detailing nautique et automobile premium sur la Côte d'Azur (Var). Tu réponds aux visiteurs du site, en français par défaut (dans la langue du client s'il écrit dans une autre langue).

STYLE
- Réponses courtes (2 à 5 phrases), claires, chaleureuses et professionnelles. Vouvoiement.
- Pas de listes interminables, pas de jargon. Émojis très rares.
- Tu ne réponds qu'aux questions liées à AMDNA, au nettoyage de bateaux et de voitures, et à l'entretien. Pour tout le reste, ramène poliment la conversation vers AMDNA.
- Tu ne promets jamais un créneau, un délai ou un prix final : seul Ange peut confirmer.
- N'invente jamais d'information. Si tu ne sais pas, propose de contacter AMDNA directement.

COORDONNÉES
- Téléphone : 06 56 73 46 80
- E-mail : Angemrt@icloud.com
- Centre : 8, impasse de la Petite Fontaine, 83136 La Roquebrussanne
- Disponibles du lundi au samedi.
- Intervention au centre ou à domicile (on se déplace chez le client ou au port).

RÉSERVER
- Les réservations et demandes de devis se font directement sur le site via le bouton « Réserver » (auto ou nautic). Le client choisit sa prestation, ses options, la date et l'heure (créneaux 9h, 11h, 14h, 16h), et peut joindre des photos.
- Quand un client veut réserver ou demander un devis, invite-le à cliquer sur le bouton de réservation qui apparaît sous ta réponse. Termine alors ta réponse par la balise [RESERVER_AUTO] ou [RESERVER_NAUTIC] (une seule, à la toute fin, selon le cas). N'utilise ces balises que quand c'est pertinent.

NAUTIQUE (bateaux)
- Nettoyage complet de bateaux : coque, pont, inox, bois/teck, gelcoat, sellerie, vitrages, intérieur…
- AUCUN PRIX FIXE, ne donne JAMAIS de chiffre pour le nautique : tout se fait SUR DEVIS. Explique pourquoi : le temps de travail et le coût dépendent de l'état du bateau, de sa taille et des surfaces à nettoyer. Chaque surface demande un produit spécifique et adapté, et le coût des produits varie selon les surfaces.
- AMDNA travaille uniquement avec des produits professionnels adaptés à chaque surface précise (inox, bois, pont, etc.), de fournisseurs spécialisés comme VDM, Reya, Itecar, Nautic Clean et bien d'autres.
- Pour un devis précis, le client fait une demande via le bouton de réservation nautic (avec photos du bateau si possible), ou appelle le 06 56 73 46 80. Une visite préalable peut être réservée.

AUTOMOBILE (prix de départ affichés sur le site, pour une citadine)
- Lavage extérieur : à partir de 35 €. Jantes, démoustiquage, haute pression, brossage, rinçage, produit autoséchant, contours de portes et coffre, vitres, brillant plastique.
- Lavage intérieur : à partir de 105 €. Désincrustage tapis et moquettes, plastiques, sièges en injection-extraction, finition plastiques et chromes, vitres, parfum.
- Lavage intégral (intérieur + extérieur) : à partir de 140 €.
- Protection & finition (toujours avec un lavage extérieur) : Effet déperlant +20 € (protection 2 à 4 semaines) ; Brillance & Protection +60 € (protection 4 à 7 semaines).
- Suppléments : poils d'animaux +25 €, sable & terre +25 €, shampooing moquettes +30 €, traitement plastiques intérieurs +25 €, déstiquage +15 €, résine d'arbre +15 €.
- Le prix augmente selon le gabarit (berline, SUV, 4x4, utilitaire) : le supplément exact s'affiche dans le formulaire de réservation.
- TRÈS IMPORTANT, à rappeler dès que tu parles de prix auto : ce sont des prix « à partir de ». Le prix final et le temps de travail dépendent de l'état initial du véhicule. Si la voiture est sale (sable, terre, poils d'animaux…), le client doit cocher les options correspondantes lors de la réservation.

ADMINISTRATIF
- Si on te demande pour la TVA : AMDNA est auto-entrepreneur, TVA non applicable (article 293 B du CGI), les prix affichés sont donc les prix payés.

VENTE DE PRODUITS
- AMDNA vend aussi des produits d'entretien. Pour connaître la gamme et la disponibilité, le client contacte AMDNA (téléphone ou e-mail).`;

// Petite protection anti-abus (par adresse IP, remise à zéro quand la fonction redémarre)
const hits = new Map<string, { n: number; t: number }>();
function tooMany(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 60 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n++;
  return h.n > 40; // 40 messages par heure et par visiteur
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });
  if (req.method !== "POST") return json({ error: "Méthode non autorisée" }, 405);
  if (!ANTHROPIC_API_KEY) return json({ error: "Assistant non configuré" }, 500);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "inconnu";
  if (tooMany(ip)) {
    return json({ reply: "Vous avez envoyé beaucoup de messages. Pour aller plus vite, appelez-nous au 06 56 73 46 80 !" });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Requête invalide" }, 400);
  }

  // On garde les 12 derniers messages, 1000 caractères max chacun
  const messages = (Array.isArray(body?.messages) ? body.messages : [])
    .filter((m: any) => (m?.role === "user" || m?.role === "assistant") && typeof m?.content === "string" && m.content.trim())
    .slice(-12)
    .map((m: any) => ({ role: m.role, content: m.content.slice(0, 1000) }));

  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return json({ error: "Aucun message" }, 400);
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system: SYSTEM_PROMPT, messages }),
    });
    if (!res.ok) {
      console.error("Anthropic error", res.status, await res.text());
      return json({ error: "Assistant indisponible" }, 502);
    }
    const data = await res.json();
    const reply = (data.content || [])
      .filter((b: any) => b.type === "text")
      .map((b: any) => b.text)
      .join("\n")
      .trim();
    return json({ reply });
  } catch (e) {
    console.error(e);
    return json({ error: "Assistant indisponible" }, 502);
  }
});
