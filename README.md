# Kadea Chat Application

Une application de messagerie instantanée web moderne, fluide et entièrement responsive, développée dans le cadre de la formation en développement web chez **Kadea**. 

Ce projet permet aux utilisateurs de s'authentifier, de rechercher des contacts au sein de la plateforme et de s'engager dans des discussions privées en temps réel (via polling).
🔗 **[Visiter le site en ligne](https://christianimbha.github.io/Kadea_chat_by_ChristianImbha/)**
---

## 🚀 Fonctionnalités principales

*   **Authentification sécurisée** : Connexion via jeton (JWT Token) persistant avec gestion active du loader visuel.
*   **Sécurisation du mot de passe** : Option d'affichage/masquage du mot de passe étudiée pour contrer les surcharges graphiques d'autocomplétion natives de Google Chrome.
*   **Design Hybride & Mode Sombre (Dark Mode)** : Interface élégante bâtie avec Tailwind CSS, intégrant un support complet et dynamique pour le mode clair et le mode sombre (Slate / Blue Navy).
*   **Architecture Responsive Avancée** :
    *   Gestion fluide des colonnes (liste de contacts vs espace de discussion) sur mobile et tablette.
    *   **Anti-Keyboard Trigger** : Algorithme personnalisé qui empêche l'ouverture du clavier virtuel mobile de réinitialiser ou de fermer prématurément la vue de la conversation en cours.
*   **Gestion des Messages & CRUD** : Envoi de messages instantanés avec défilement automatique intelligent (auto-scroll) et possibilité de supprimer ses propres messages via une modale de confirmation personnalisée.
*   **Notifications Toasts** : Système d'alertes visuelles épurées pour notifier l'utilisateur des succès, erreurs ou informations système.

---

## 🛠️ Technologies & Outils utilisés

*   **Structure & Syntaxe** : HTML5 / JavaScript (ES6+)
*   **Design & Layout** : [Tailwind CSS](https://tailwindcss.com) (via CDN, approche utilitaire)
*   **Bibliothèques d'Icônes** : Lucide Icons & FontAwesome 6
*   **Gestion de versions** : Git & GitHub (méthodologie multi-branches : `main` et `develop`)
*   **API Distante** : Connexion à une API REST externe dédiée à la gestion du Workspace Kadea.

---

## 📁 Structure du Projet

```text
├── index.html          # Page d'authentification (Login)
├── chat.html           # Interface principale de la messagerie
├── profil.html         # Page de gestion du profil utilisateur
├── login.js            # Logique d'authentification et sécurité du formulaire
├── chat.js             # Moteur principal (gestion responsive, messages, thèmes)
└── README.md           # Documentation du projet