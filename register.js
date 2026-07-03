// BLOC 1 : Configuration globale
const API_URL = "https://kadea-chat-api.onrender.com";
const Workspace_API_KEY = "wksp_c3e1fb2ba091b7e4a9697b611e1d7168";

// Gestion de la visibilité des mots de passe (icône de l'œil)
document.querySelectorAll('.btn-toggle-password').forEach(button => {
  button.addEventListener('click', () => {
    // Récupère l'identifiant du champ cible grâce à l'attribut data-target
    const targetId = button.getAttribute('data-target');
    const input = document.getElementById(targetId);
    const icon = button.querySelector('i');
    
    // Alterne entre le type 'password' et 'text'
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.replace('fa-regular', 'fa-solid'); // Change le style de l'icône
    } else {
      input.type = 'password';
      icon.classList.replace('fa-solid', 'fa-regular');
    }
  });
});

// BLOC 2 : Interception de l'événement de soumission du formulaire
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Empêche le rechargement natif de la page HTML

  // Récupération et nettoyage des valeurs saisies par l'utilisateur
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validation locale : vérification de la correspondance des mots de passe
  if (password !== confirmPassword) {
    alert("Erreur : Les mots de passe ne correspondent pas !");
    return; // Arrête immédiatement l'exécution du script
  }
  
  // Validation locale : présence d'un caractère spécial
  const specialCharRegex = /[!@#$%^&*(),.?:{}|<>]/;
  if (!specialCharRegex.test(password)) {
    alert("⚠️ Sécurité : Votre mot de passe doit contenir au moins un caractère spécial (ex: @, !, $, etc.).");
    return; // Bloque la soumission si le caractère spécial est absent
  }

  // BLOC 3 : Préparation des données au format attendu par le backend
  const payload = {
    fullName: fullName, 
    email: email,
    password: password
  };

  try {
    // CORRECTION ICI : Remplacement de /register par /auth/register
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indique au serveur qu'on lui envoie du JSON
        "x-api-key": Workspace_API_KEY      // Utilisation dynamique de la variable déclarée en haut
      },
      body: JSON.stringify(payload) // Convertit l'objet JavaScript en chaîne JSON
    });

    const data = await response.json(); // Analyse de la réponse JSON du serveur

   if (response.ok) {
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popupContent');

  // Affiche le fond
  popup.classList.remove('hidden');
  popup.classList.add('opacity-100');

  // Animation du contenu (fade-in + slide-up)
  setTimeout(() => {
    popupContent.classList.remove('translate-y-10', 'opacity-0');
    popupContent.classList.add('translate-y-0', 'opacity-100');
  }, 50);

  // Ferme la popup et redirige
  document.getElementById('popupClose').addEventListener('click', () => {
    popup.classList.add('hidden');
    window.location.href = 'login.html';
  });
} 

  } catch (error) {
    // Gestion des erreurs réseau (ex: panne serveur)
    console.error("Erreur réseau :", error);
    alert("Impossible de joindre le serveur. Veuillez vérifier votre connexion.");
  }
}); // Fermeture de l'écouteur d'événement submit du Bloc 2