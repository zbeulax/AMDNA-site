-- ==========================================================
-- AMDNA — Schéma Supabase
-- À copier-coller dans Supabase : SQL Editor → New query → Run
-- ==========================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------
-- 1. RÉSERVATIONS (contient les données personnelles clients)
-- ----------------------------------------------------------
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  service text not null check (service in ('nautic','auto')),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  location text,
  asset text,
  message text,
  visit_requested boolean not null default false,
  date date,
  time text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','partial','paid')),
  admin_notes text
);

alter table bookings enable row level security;

-- N'importe qui peut créer une réservation (le formulaire du site)
drop policy if exists "public_insert_bookings" on bookings;
create policy "public_insert_bookings" on bookings
  for insert to anon with check (true);

-- Seul le compte admin connecté peut lire / modifier les réservations
drop policy if exists "owner_select_bookings" on bookings;
create policy "owner_select_bookings" on bookings
  for select to authenticated using (true);
drop policy if exists "owner_update_bookings" on bookings;
create policy "owner_update_bookings" on bookings
  for update to authenticated using (true);

-- ----------------------------------------------------------
-- 2. CRÉNEAUX PRIS (public en lecture seule, sans données perso)
--    Permet au calendrier du site de griser les dates déjà prises
--    pour TOUS les visiteurs, sans exposer les infos clients.
-- ----------------------------------------------------------
create table if not exists taken_slots (
  date date not null,
  time text not null,
  primary key (date, time)
);
alter table taken_slots enable row level security;
drop policy if exists "public_select_taken_slots" on taken_slots;
create policy "public_select_taken_slots" on taken_slots
  for select to anon using (true);


-- Le créneau n'est bloqué pour les autres clients qu'une fois la demande
-- CONFIRMÉE par toi dans l'espace admin (statut = 'confirmed'). Une simple
-- demande en attente ne bloque donc rien : deux clients peuvent demander
-- le même créneau, à toi de choisir lequel confirmer. Si tu annules une
-- réservation confirmée, le créneau redevient disponible automatiquement.
create or replace function sync_taken_slot() returns trigger
language plpgsql security definer as $$
begin
  if new.status='confirmed' and new.date is not null and new.time is not null then
    insert into taken_slots(date,time) values (new.date,new.time)
    on conflict do nothing;
  elsif TG_OP='UPDATE' and old.status='confirmed' and new.status<>'confirmed' and new.date is not null and new.time is not null then
    delete from taken_slots where date=new.date and time=new.time;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_sync_taken_slot on bookings;
drop trigger if exists trg_release_taken_slot on bookings;
drop function if exists release_taken_slot();
create trigger trg_sync_taken_slot
after insert or update on bookings
for each row execute function sync_taken_slot();

-- ----------------------------------------------------------
-- 3. DATES BLOQUÉES MANUELLEMENT (vacances, jours fermés...)
-- ----------------------------------------------------------
create table if not exists blocked_dates (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  reason text
);
alter table blocked_dates enable row level security;
drop policy if exists "public_select_blocked_dates" on blocked_dates;
create policy "public_select_blocked_dates" on blocked_dates
  for select to anon using (true);
drop policy if exists "owner_manage_blocked_dates" on blocked_dates;
create policy "owner_manage_blocked_dates" on blocked_dates
  for all to authenticated using (true) with check (true);

-- ----------------------------------------------------------
-- 4. DEVIS (privé, uniquement toi)
-- ----------------------------------------------------------
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  quote_number text,
  client_name text not null,
  client_email text,
  client_phone text,
  client_address text,
  service text,
  items jsonb not null default '[]',
  total numeric not null default 0,
  notes text
);
alter table quotes enable row level security;
drop policy if exists "owner_manage_quotes" on quotes;
create policy "owner_manage_quotes" on quotes
  for all to authenticated using (true) with check (true);

-- ----------------------------------------------------------
-- 5. AVIS CLIENTS (public peut poster + lire les approuvés ;
--    toi seul peut voir/modérer tout)
-- ----------------------------------------------------------
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  rating int not null check (rating between 1 and 5),
  comment text,
  approved boolean not null default false
);
alter table reviews enable row level security;

drop policy if exists "public_insert_review" on reviews;
create policy "public_insert_review" on reviews
  for insert to anon with check (approved = false);
drop policy if exists "public_select_approved_reviews" on reviews;
create policy "public_select_approved_reviews" on reviews
  for select to anon using (approved = true);
drop policy if exists "owner_select_all_reviews" on reviews;
create policy "owner_select_all_reviews" on reviews
  for select to authenticated using (true);
drop policy if exists "owner_update_reviews" on reviews;
create policy "owner_update_reviews" on reviews
  for update to authenticated using (true);

-- ----------------------------------------------------------
-- 6. Détail de la prestation auto choisie + photos envoyées
--    (ajouté après coup : IF NOT EXISTS permet de rejouer ce
--    script sans erreur même si tes tables existent déjà)
-- ----------------------------------------------------------
alter table bookings add column if not exists sub_service text;
alter table bookings add column if not exists supplements jsonb default '[]';
alter table bookings add column if not exists total_price numeric;
alter table bookings add column if not exists photos jsonb default '[]';
alter table bookings add column if not exists protection_option text;
alter table bookings add column if not exists location_mode text;
alter table bookings add column if not exists vehicle_category text;
alter table bookings add column if not exists manual_entry boolean default false;
alter table quotes add column if not exists status text default 'pending';
alter table quotes add column if not exists vat_labor boolean default false;
alter table quotes add column if not exists vat_produit boolean default false;
alter table quotes add column if not exists vat_amount numeric default 0;
alter table quotes add column if not exists total_ttc numeric;
alter table quotes add column if not exists client_first_name text;

-- ----------------------------------------------------------
-- 8. Créneaux bloqués manuellement par toi (calendrier planning),
--    avec heure de début/fin précise.
-- ----------------------------------------------------------
create table if not exists manual_blocks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  date date not null,
  start_time text not null,
  end_time text not null,
  service text,
  description text,
  blocked_slots jsonb default '[]'
);
alter table manual_blocks enable row level security;
drop policy if exists "owner_manage_manual_blocks" on manual_blocks;
create policy "owner_manage_manual_blocks" on manual_blocks
  for all to authenticated using (true) with check (true);

-- Te permet, une fois connecté à l'admin, de bloquer/libérer directement
-- des créneaux (utilisé par le calendrier "Planning").
drop policy if exists "owner_manage_taken_slots" on taken_slots;
create policy "owner_manage_taken_slots" on taken_slots
  for all to authenticated using (true) with check (true);

-- ----------------------------------------------------------
-- 7. Bucket de stockage pour les photos envoyées par les clients
--    (privé : seul toi, une fois connecté à l'admin, peux les voir)
-- ----------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('booking-photos', 'booking-photos', false)
on conflict (id) do nothing;

drop policy if exists "public_upload_booking_photos" on storage.objects;
create policy "public_upload_booking_photos" on storage.objects
  for insert to anon
  with check (bucket_id = 'booking-photos');

drop policy if exists "owner_read_booking_photos" on storage.objects;
create policy "owner_read_booking_photos" on storage.objects
  for select to authenticated
  using (bucket_id = 'booking-photos');

-- ----------------------------------------------------------
-- 9. Base de données clients (privé, uniquement toi).
--    Alimentée automatiquement à chaque enregistrement de devis :
--    un client déjà connu (même nom) est mis à jour, sinon créé.
-- ----------------------------------------------------------
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  first_name text,
  email text,
  phone text,
  address text,
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','deposit','paid'))
);
alter table clients enable row level security;
drop policy if exists "owner_manage_clients" on clients;
create policy "owner_manage_clients" on clients
  for all to authenticated using (true) with check (true);

-- ==========================================================
-- Fin du script. Une fois exécuté sans erreur, ton site peut
-- se connecter à ces tables via supabase-config.js.
-- ==========================================================
