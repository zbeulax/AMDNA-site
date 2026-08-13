// ==========================================================
// Edge Function : send-confirmation
// Envoie un e-mail (Resend) et, si configuré, un SMS (Twilio)
// quand une réservation est créée, confirmée ou reprogrammée.
// ==========================================================
// Déploiement : voir SETUP.md
// Secrets nécessaires (Supabase → Project Settings → Edge Functions → Secrets) :
//   RESEND_API_KEY   (obligatoire pour l'e-mail)
//   FROM_EMAIL        (ex: reservation@votredomaine.fr, doit être vérifié sur Resend)
//   TWILIO_SID         (optionnel, pour le SMS)
//   TWILIO_TOKEN       (optionnel)
//   TWILIO_FROM        (optionnel, ton numéro Twilio)
// ==========================================================

import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "reservation@amdna.fr";
const TWILIO_SID = Deno.env.get("TWILIO_SID");
const TWILIO_TOKEN = Deno.env.get("TWILIO_TOKEN");
const TWILIO_FROM = Deno.env.get("TWILIO_FROM");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function frenchDate(dateStr: string) {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat("fr-FR", { dateStyle: "full" }).format(new Date(dateStr + "T12:00:00"));
  } catch {
    return dateStr;
  }
}

function emailHtml({ firstName, service, date, time, kind }: any) {
  const serviceLabel = service === "auto" ? "nettoyage automobile" : "nettoyage nautic";
  const dateLine = date ? `le <strong>${frenchDate(date)}</strong>${time ? ` à <strong>${time}</strong>` : ""}` : "à venir";
  const title =
    kind === "reschedule"
      ? "Votre rendez-vous a été déplacé"
      : kind === "confirmed"
      ? "Votre rendez-vous est confirmé"
      : "Votre demande a bien été reçue";

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#06111f;padding:40px 20px;">
    <div style="max-width:520px;margin:auto;background:#0a1a2d;border-radius:16px;padding:36px;color:#f4f7f9;">
      <p style="text-transform:uppercase;letter-spacing:2px;font-size:11px;color:#7e9db8;margin:0 0 14px;">AMDNA · Nautic & Auto Detailing</p>
      <h1 style="font-size:26px;margin:0 0 18px;">${title}</h1>
      <p style="line-height:1.6;color:#dbe4ea;">Bonjour ${firstName || ""},</p>
      <p style="line-height:1.6;color:#dbe4ea;">
        Votre ${serviceLabel} est prévu ${dateLine}.
      </p>
      <p style="line-height:1.6;color:#9fb1bf;font-size:14px;">
        Nous restons disponibles pour toute question avant votre rendez-vous.
      </p>
      <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,.12);font-size:12px;color:#7e8fa0;">
        AMDNA — Nautic &amp; Auto Detailing · Côte d'Azur / Var<br>
        06 56 73 46 80 · Angemrt@icloud.com
      </div>
    </div>
  </div>`;
}

function smsText({ service, date, time, kind }: any) {
  const serviceLabel = service === "auto" ? "nettoyage auto" : "nettoyage nautic";
  const dateLine = date ? `le ${frenchDate(date)}${time ? ` à ${time}` : ""}` : "";
  if (kind === "reschedule") return `AMDNA — Votre rendez-vous ${serviceLabel} a été déplacé ${dateLine}. Merci de votre compréhension.`;
  if (kind === "confirmed") return `AMDNA — Votre rendez-vous ${serviceLabel} ${dateLine} est confirmé. À bientôt !`;
  return `AMDNA — Votre demande de ${serviceLabel} ${dateLine} est bien enregistrée. Confirmation par e-mail à suivre.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  try {
    const payload = await req.json();
    const { firstName, email, phone, service, date, time, kind } = payload;
    const results: Record<string, unknown> = {};

    if (RESEND_API_KEY && email) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: email,
          subject: "AMDNA — Confirmation de votre rendez-vous",
          html: emailHtml({ firstName, service, date, time, kind }),
        }),
      });
      results.email = { ok: r.ok, status: r.status };
    } else {
      results.email = { ok: false, reason: "RESEND_API_KEY manquant ou e-mail absent" };
    }

    if (TWILIO_SID && TWILIO_TOKEN && TWILIO_FROM && phone) {
      const body = new URLSearchParams({
        To: phone,
        From: TWILIO_FROM,
        Body: smsText({ service, date, time, kind }),
      });
      const r = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        }
      );
      results.sms = { ok: r.ok, status: r.status };
    } else {
      results.sms = { ok: false, reason: "Twilio non configuré (optionnel)" };
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});
