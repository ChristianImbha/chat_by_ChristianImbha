// URL de base de ton API REST locale (fournie par le cahier des charges)
const API_URL = "http://localhost:3000/auth";

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

// Interception de l'événement de soumission du formulaire
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

  // Préparation des données au format attendu par le backend
  const payload = {
    username: fullName, // Assure-toi que la clé correspond exactement aux attentes de ton API
    email: email,
    password: password
  };

  try {
    // Envoi de la requête HTTP asynchrone à l'API REST
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Indique au serveur qu'on lui envoie du JSON
      },
      body: JSON.stringify(payload) // Convertit l'objet JavaScript en chaîne JSON
    });

    const data = await response.json(); // Analyse de la réponse JSON du serveur

    if (response.ok) {
      alert("Inscription réussie ! Redirection vers la page de connexion...");
      window.location.href = 'login.html'; // Redirection de l'utilisateur
    } else {
      // Si le serveur renvoie une erreur (ex: email déjà utilisé)
      alert(`Erreur d'inscription : ${data.message || 'Une erreur est survenue'}`);
    }

  } catch (error) {
    // Gestion des erreurs réseau (ex: serveur local éteint)
    console.error("Erreur réseau :", error);
    alert("Impossible de joindre le serveur. Veuillez vérifier votre connexion.");
  }
}); // Fermeture de l'écouteur d'événement submit du Bloc 2