# AMDNA — Guide de mise en route

Ce guide t'explique, étape par étape, comment brancher tout ce qui a été
construit : calendrier partagé, e-mail (et SMS en option) de confirmation,
avis clients, et ton interface admin (`admin.html`).

Tu n'as pas besoin de savoir coder pour suivre ce guide, juste de créer
quelques comptes gratuits et de copier-coller des clés.

---

## 0. Ce que tu vas obtenir à la fin

- Un calendrier de réservation **partagé** : si un créneau est pris par un
  client, il est grisé pour tous les autres visiteurs.
- Un **e-mail automatique** envoyé au client dès qu'il réserve (et un SMS si
  tu configures Twilio, en option, payant).
- Une **base de données clients** que toi seul peux consulter.
- Une page **`admin.html`** protégée par mot de passe, où tu gères :
  planning, statuts de paiement, reprogrammation, devis PDF, avis clients.

---

## 1. Créer ton projet Supabase (base de données + connexion)

1. Va sur **https://supabase.com** → "Start your project" → crée un compte
   (gratuit).
2. Crée un nouveau projet : donne-lui un nom (ex. `amdna`), un mot de passe
   de base de données (note-le quelque part), choisis une région proche de
   toi (ex. `eu-west` — Europe).
3. Attends 1 à 2 minutes que le projet soit prêt.

### Exécuter le schéma de base de données

1. Dans le menu de gauche, clique sur **SQL Editor**.
2. Clique sur **New query**.
3. Ouvre le fichier `supabase/schema.sql` (fourni dans ce zip), copie tout
   son contenu, colle-le dans l'éditeur.
4. Clique sur **Run**. Tu dois voir "Success" — c'est bon, tes tables sont
   créées (réservations, créneaux, devis, avis...).

### Récupérer tes clés de connexion

1. Menu de gauche → **Settings** (roue crantée) → **API**.
2. Copie la valeur **Project URL**.
3. Copie la valeur **anon public** (clé publique — pas "service_role", qui
   elle est secrète et ne doit jamais aller dans le site).
4. Ouvre le fichier `supabase-config.js` et remplace :
   ```js
   export const SUPABASE_URL = "VOTRE_SUPABASE_URL_ICI";
   export const SUPABASE_ANON_KEY = "VOTRE_SUPABASE_ANON_KEY_ICI";
   ```
   par tes vraies valeurs.

### Créer ton compte admin (pour te connecter à admin.html)

1. Menu de gauche → **Authentication** → **Users** → **Add user** →
   **Create new user**.
2. Renseigne ton e-mail et un mot de passe. Décoche "Send confirmation
   email" (pas nécessaire), puis crée l'utilisateur.
3. C'est cet e-mail + mot de passe que tu utiliseras pour te connecter sur
   `admin.html`.

⚠️ Ne crée jamais d'autre utilisateur ici sauf si tu veux donner l'accès
admin à quelqu'un d'autre.

---

## 2. Configurer l'envoi d'e-mails (Resend)

1. Va sur **https://resend.com** → crée un compte gratuit (100 e-mails/jour
   offerts, largement suffisant pour démarrer).
2. Dans Resend : **API Keys** → **Create API Key** → copie la clé (elle
   commence par `re_`).
3. Pour l'adresse d'envoi : le plus simple pour démarrer est d'utiliser le
   domaine de test fourni par Resend (`onboarding@resend.dev`) — les
   e-mails partiront bien, mais depuis cette adresse générique. Pour envoyer
   depuis une adresse à ton nom (ex. `contact@ton-domaine.fr`), il faut
   posséder un nom de domaine et le "vérifier" dans Resend (section
   **Domains**) — c'est optionnel, tu peux commencer sans.

---

## 3. Déployer la fonction d'envoi (Edge Function)

C'est la seule étape qui demande d'ouvrir un terminal. Ne t'inquiète pas,
ce sont des commandes à copier-coller.

1. Installe l'outil Supabase CLI :
   - Mac : `brew install supabase/tap/supabase`
   - Windows/Linux : voir https://supabase.com/docs/guides/cli (un
     installeur y est fourni)
2. Dans un terminal, place-toi dans le dossier de ton site (celui qui
   contient le dossier `supabase/`) :
   ```
   cd chemin/vers/ton/site
   ```
3. Connecte-toi :
   ```
   supabase login
   ```
   (ça ouvre ton navigateur pour valider)
4. Relie ce dossier à ton projet Supabase — l'ID du projet se trouve dans
   Settings → General → "Reference ID" :
   ```
   supabase link --project-ref TON_REFERENCE_ID
   ```
5. Ajoute tes secrets (remplace par tes vraies valeurs) :
   ```
   supabase secrets set RESEND_API_KEY=re_xxxxxxxx
   supabase secrets set FROM_EMAIL=onboarding@resend.dev
   ```
6. Déploie la fonction :
   ```
   supabase functions deploy send-confirmation
   ```

C'est fait — dès qu'un client réserve, l'e-mail part automatiquement.

### (Optionnel) Activer le SMS avec Twilio

Le SMS n'est **pas gratuit** (facturé au message, quelques centimes
chacun) et demande un numéro de téléphone Twilio (quelques euros/mois).
Si tu veux l'activer :

1. Crée un compte sur **https://www.twilio.com**, achète un numéro.
2. Récupère ton **Account SID**, ton **Auth Token**, et ton numéro Twilio.
3. Ajoute les secrets :
   ```
   supabase secrets set TWILIO_SID=xxxxxxxx
   supabase secrets set TWILIO_TOKEN=xxxxxxxx
   supabase secrets set TWILIO_FROM=+33xxxxxxxxx
   ```
4. Redéploie : `supabase functions deploy send-confirmation`

Si tu ne configures pas Twilio, tout continue de fonctionner normalement,
simplement sans SMS (l'e-mail seul est envoyé).

---

## 4. Tester en local

1. Ouvre le dossier du site dans VS Code, clique droit sur `index.html` →
   **Open with Live Server** (voir l'extension "Live Server" si pas encore
   installée).
2. Fais une réservation test de bout en bout (formulaire → calendrier →
   confirmer). Tu dois recevoir l'e-mail de confirmation à l'adresse que tu
   as saisie.
3. Dans Supabase → **Table Editor** → table `bookings`, tu dois voir la
   ligne apparaître.
4. Ouvre `admin.html`, connecte-toi avec le compte créé à l'étape 1 — tu
   dois voir la réservation dans l'onglet **Planning**.

---

## 5. Mettre le site en ligne pour de vrai

Tant que le site n'est ouvert qu'en local (Live Server), seul toi peux le
voir. Pour que tes clients puissent réserver, il faut héberger les
fichiers quelque part. Le plus simple et gratuit :

1. Va sur **https://app.netlify.com/drop**
2. Glisse-dépose le dossier entier de ton site (avec `index.html`,
   `admin.html`, `assets/`, etc. — pas besoin du dossier `supabase/`, il
   reste sur ton ordinateur).
3. Netlify te donne une adresse en quelques secondes (ex.
   `amdna.netlify.app`). Tu peux ensuite y relier ton propre nom de domaine
   si tu en as un (Netlify → Domain settings).

---

## 6. Ce que tu peux faire dans `admin.html`

- **Planning** : liste de toutes les réservations, filtrable par statut et
  service. Un résumé des 7 prochains jours en haut te montre ta charge de
  travail. Tu peux changer le statut (En attente / Confirmée / Annulée),
  le statut de paiement (Impayé / Partiel / Payé), et reprogrammer une
  date — un e-mail est renvoyé automatiquement au client à chaque
  confirmation ou reprogrammation.
- **Devis** : remplis les informations client et les lignes de
  prestation, le total se calcule automatiquement. "Télécharger le PDF"
  génère un devis prêt à envoyer par e-mail, avec la mention légale
  "TVA non applicable, art. 293 B du CGI". "Enregistrer" garde une trace
  dans ton historique de devis (rubrique à droite).
- **Avis** : les avis postés par les clients apparaissent d'abord ici, en
  attente. Tu cliques "Approuver" pour qu'ils apparaissent sur le site
  public, ou "Refuser" pour les supprimer. Tu peux aussi "Masquer" un avis
  déjà publié à tout moment.
- **Dates bloquées** : bloque manuellement une date (vacances, jour
  fermé...) — elle devient indisponible dans le calendrier de réservation
  du site.

---

## 7. Mises à jour importantes — à refaire si tu as déjà configuré Supabase

Si tu avais déjà suivi ce guide avant, deux comportements ont changé :

- **Le créneau ne bloque plus le calendrier dès la demande** — il ne se
  bloque pour les autres clients qu'une fois que **tu as confirmé** la
  réservation dans l'admin (statut "Confirmée"). Si tu annules une
  réservation confirmée, le créneau redevient disponible automatiquement.
- **Les photos envoyées par le client sont maintenant réellement
  sauvegardées** (avant, elles n'étaient visibles que dans le navigateur
  du client, jamais transmises). Elles sont stockées dans un espace privé
  que toi seul peux consulter depuis l'admin (bouton "Voir (n)" dans la
  colonne Photos).

Pour activer ça : retourne dans Supabase → **SQL Editor**, ouvre à nouveau
`supabase/schema.sql`, copie-colle tout son contenu et clique **Run**. Le
script est conçu pour être rejoué sans risque, même si tes tables
existent déjà — rien n'est supprimé ni écrasé.

## 8. Suppression automatique des photos (tous les mois)

Pour éviter que l'espace de stockage se remplisse, les photos jointes aux
réservations sont automatiquement supprimées **30 jours** après la
réservation (la réservation elle-même reste visible dans l'admin — seules
les photos disparaissent).

1. Déploie la fonction (même terminal que pour `send-confirmation`) :
   ```
   supabase functions deploy cleanup-old-photos --no-verify-jwt
   ```
2. Récupère ta "Reference ID" : Supabase → Settings → General.
3. Dans Supabase → **SQL Editor** → New query, colle ceci en remplaçant
   `TON_REFERENCE_ID` par la tienne, puis Run :
   ```sql
   create extension if not exists pg_cron;
   create extension if not exists pg_net;

   select cron.schedule(
     'cleanup-old-booking-photos',
     '0 3 * * *', -- tous les jours à 3h du matin
     $$
     select net.http_post(
       url := 'https://TON_REFERENCE_ID.supabase.co/functions/v1/cleanup-old-photos',
       headers := '{"Content-Type": "application/json"}'::jsonb
     );
     $$
   );
   ```

C'est tout — la tâche tourne désormais toute seule chaque nuit, sans que tu
aies à y penser. Pour vérifier qu'elle fonctionne, ou l'arrêter un jour :
- Voir les tâches planifiées : `select * from cron.job;`
- Supprimer la tâche : `select cron.unschedule('cleanup-old-booking-photos');`
- Changer le délai (ex. 60 jours au lieu de 30) : modifie `RETENTION_DAYS`
  dans `supabase/functions/cleanup-old-photos/index.ts`, puis redéploie
  avec la commande de l'étape 1.

## 9. Empêcher la mise en pause (plan gratuit)

Sur le plan gratuit, si **personne** ne visite ton site pendant 7 jours
d'affilée, Supabase met le projet en pause — et il faut alors se reconnecter
au dashboard Supabase et cliquer "Restaurer" pour qu'il refonctionne (ça ne
se réactive pas tout seul). Deux façons gratuites d'éviter ça complètement :

**Méthode simple — UptimeRobot (recommandée, sans code)**
1. Crée un compte gratuit sur uptimerobot.com.
2. Récupère ton "Project URL" dans Supabase → Settings → API.
3. Add New Monitor → type HTTP(s) → colle `TON_PROJECT_URL/rest/v1/` →
   intervalle 24h.
4. Dans les options avancées, ajoute une en-tête personnalisée :
   `apikey` = ta clé "anon public" (même page Supabase). Si cette option
   n'existe pas sur ton compte gratuit, passe à la méthode ci-dessous.

**Méthode de secours — GitHub Actions (100% gratuite, demande un compte
GitHub)**
Le fichier `.github/workflows/keep-supabase-alive.yml` est déjà prêt dans ce
zip. Toutes les instructions de mise en route sont écrites en commentaire
en haut du fichier — en résumé : pousse ce dossier sur un dépôt GitHub,
ajoute tes deux clés Supabase dans les "Secrets" du dépôt, et c'est
automatique dès le lendemain.

Dans les deux cas, une seule des deux méthodes suffit — inutile de
configurer les deux en même temps.

## 10. Limites à connaître

- **Pas de paiement en ligne intégré** : le suivi "payé / impayé" est un
  simple statut que tu coches toi-même dans l'admin, il n'y a pas de
  prélèvement automatique par carte bancaire. Si tu veux ça plus tard,
  Stripe est l'option la plus courante — ça demande un développement
  supplémentaire.
- **SMS payant** et nécessite un numéro Twilio — l'e-mail seul fonctionne
  sans coût dans les limites gratuites de Resend (100/jour).
- **Une seule personne admin** prévue (toi). Si tu veux plus tard donner
  accès à un employé, il suffira de créer un second utilisateur dans
  Supabase Authentication.
- Le plan gratuit Supabase suspend un projet inactif après une semaine
  sans trafic (il se réactive automatiquement à la première visite, avec
  quelques secondes de délai) — largement suffisant pour démarrer ; tu
  pourras passer au plan payant (~25 $/mois) plus tard si le volume grossit.

---

Si une étape bloque, dis-moi exactement où et ce que tu vois à l'écran —
je t'aiderai à débloquer.
