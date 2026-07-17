document.addEventListener("DOMContentLoaded", () => {
    // 1. Récupération des infos utilisateur stockées lors du login
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    const savedUserId = localStorage.getItem("userId");
    const savedAvatar = localStorage.getItem("userAvatar");

    // 2. Ciblage des éléments de la page
    const nameHeading = document.getElementById("profile-name");
    const emailParagraph = document.getElementById("profile-email");
    const usernameSpan = document.getElementById("profile-username");
    const avatarImg = document.getElementById("profile-page-avatar");
    const logoutBtn = document.getElementById("logout-btn");

    // 3. Injection dynamique des données si elles existent
    if (nameHeading && savedName) {
        nameHeading.textContent = savedName;
    }

    if (emailParagraph && savedEmail) {
        emailParagraph.textContent = savedEmail;
    }

    // Affiche l'ID de l'utilisateur ou une valeur par défaut s'il est vide
    if (usernameSpan) {
        usernameSpan.textContent = savedUserId ? savedUserId : "Non défini (Local)";
    }

    // Gestion de la photo de profil (utilise un avatar Robot par défaut indexé sur l'ID)
    if (avatarImg) {
        if (savedAvatar && savedAvatar !== "undefined" && savedAvatar !== "") {
            avatarImg.src = savedAvatar;
        } else {
            const seed = savedUserId || "default";
            avatarImg.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
        }
    }

    // 4. Gestion du bouton Déconnexion avec redirection
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Nettoyage complet des jetons et de la session actuelle
            localStorage.clear();
            sessionStorage.clear();

            // Redirection immédiate vers la page login.html
            window.location.href = "login.html";
        });
    }
});