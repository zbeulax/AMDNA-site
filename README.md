# AMDNA — expérience 3D Nautic & Auto

## Ce qui est inclus
- Landing page immersive 3D au scroll
- Yacht générique procédural
- 3 véhicules génériques procéduraux
- Mer animée
- Transition nautic → automobile
- Responsive desktop + iPhone
- Formulaire devis/réservation
- Ajout et aperçu de photos
- Option « visite préalable au devis »
- Calendrier de démonstration avec créneaux configurables
- Écran de confirmation
- Bouton de préparation d'e-mail
- Lien vers la base Detailr actuelle

## Mise en ligne
Aucun build n'est nécessaire. Envoyez le dossier complet sur un hébergeur statique (Netlify, Vercel, Cloudflare Pages, hébergement mutualisé, etc.).

## Important : calendrier réel
Le calendrier fourni est un front-end fonctionnel de démonstration. Pour réellement :
1. bloquer les créneaux pour tous les clients,
2. envoyer automatiquement un e-mail au client et à AMDNA,
3. stocker les formulaires et les photos,
4. synchroniser Google/Outlook Calendar,

il faut connecter `submitBooking()` dans `app.js` à un backend/API ou à un service de réservation.

### Première configuration
Dans `app.js` :
- remplacer `VOTRE_EMAIL_ICI` par l'e-mail AMDNA ;
- renseigner `blockedDates` pour les jours déjà indisponibles ;
- adapter `hours` aux horaires de visite ;
- remplacer ensuite le `mailto:` par votre endpoint de réservation réel.

## Modèles 3D
Les formes 3D sont générées directement par Three.js afin que le site soit immédiatement testable sans télécharger de gros fichiers 3D externes. Pour une version V2 encore plus photoréaliste, les groupes `yacht` et `cars` peuvent être remplacés par des modèles `.glb` optimisés (avec Draco/KTX2) sans changer l'architecture du site.

## Référence actuelle
La page de réservation actuelle est conservée comme lien de secours :
https://detailr.co/book/am-detailing-nautic-auto
