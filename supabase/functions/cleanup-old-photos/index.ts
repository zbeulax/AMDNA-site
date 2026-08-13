// ==========================================================
// Edge Function : cleanup-old-photos
// Supprime automatiquement les photos des réservations de plus
// de 30 jours (libère l'espace de stockage). Ne touche à rien
// d'autre : les réservations elles-mêmes restent dans l'admin,
// seules les photos jointes sont retirées.
// ==========================================================
// Déploiement : voir SETUP.md
// Cette fonction utilise la clé "service role" fournie
// automatiquement par Supabase à l'exécution (aucun secret à
// configurer manuellement pour celle-ci).
// ==========================================================

import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RETENTION_DAYS = 30;

serve(async () => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - RETENTION_DAYS);

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("id, photos")
      .lt("created_at", cutoff.toISOString())
      .not("photos", "eq", "[]");

    if (error) throw error;

    let filesDeleted = 0;
    let bookingsCleared = 0;

    for (const booking of bookings ?? []) {
      const paths: string[] = booking.photos || [];
      if (!paths.length) continue;

      const { error: removeError } = await supabase.storage
        .from("booking-photos")
        .remove(paths);
      if (!removeError) filesDeleted += paths.length;

      await supabase.from("bookings").update({ photos: [] }).eq("id", booking.id);
      bookingsCleared++;
    }

    return new Response(
      JSON.stringify({ ok: true, bookingsCleared, filesDeleted }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
