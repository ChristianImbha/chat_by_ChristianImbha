document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // 1. Décodage du token pour la clé workspace
    let workspaceKey = "";
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const userData = JSON.parse(window.atob(base64));
        workspaceKey = userData.workspaceKey; 
    } catch (e) {
        console.error("Impossible de lire la clé workspace", e);
    }

    // 2. Ciblage des éléments HTML
    const nameHeading = document.getElementById("profile-name");
    const emailParagraph = document.getElementById("profile-email");
    const usernameSpan = document.getElementById("profile-username");
    const avatarImg = document.getElementById("profile-page-avatar");
    const logoutBtn = document.getElementById("logout-btn");
    const EditeProfilBtn = document.getElementById("edit-profile-btn");
    const avatarInput = document.getElementById("avatar-input"); // Ciblage de l'input caché

    // Configuration Cloudinary (Ton Cloud Name est déjà intégré !)
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dctgg4xw/image/upload";
    const CLOUDINARY_PRESET = "ciu7uafl";
    const API_URL = "https://kadea-chat-api.onrender.com"; 

    // 3. Récupération initiale des infos du profil
    fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "x-api-key": workspaceKey
        }
    })
    .then(response => response.json())
    .then(res => {
        const user = res.data && res.data.user;
        if (user) {
            if (nameHeading) nameHeading.textContent = user.fullName || "Utilisateur";
            if (emailParagraph) emailParagraph.textContent = user.email || "Non communiqué";
            if (usernameSpan) usernameSpan.textContent = user.id || "N/A";

            // Si l'utilisateur a déjà une photo sur Cloudinary, on l'affiche. Sinon, le robot.
            if (avatarImg) {
                avatarImg.src = user.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`;
            }
        }
    })
    .catch(error => console.error("Erreur chargement profil :", error));

    // 4. LE CODE D'IMPORTATION IMAGE (Placé ici, bien au chaud)
    if (avatarInput) {
        avatarInput.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            console.log("Image prête à être envoyée vers Cloudinary !", file);
            
            // Effet visuel d'attente
            if (avatarImg) avatarImg.style.opacity = "0.5";

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_PRESET);

            try {
                // Envoi à Cloudinary
                const cloudRes = await fetch(CLOUDINARY_URL, { method: "POST", body: formData });
                if (!cloudRes.ok) throw new Error("Échec upload Cloudinary");

                const cloudData = await cloudRes.json();
                const secureUrl = cloudData.secure_url; 
                console.log("Lien Cloudinary obtenu :", secureUrl);

                // Sauvegarde de l'URL sur l'API de Kadea
                // Note : Vérifie sur ton Swagger s'il s'agit de PUT ou PATCH pour modifier le profil
                const apiRes = await fetch(`${API_URL}/auth/me`, {
                    method: "PUT", 
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                        "x-api-key": workspaceKey
                    },
                    body: JSON.stringify({ avatarUrl: secureUrl })
                });

                if (apiRes.ok) {
                    if (avatarImg) {
                        avatarImg.src = secureUrl; // Met à jour l'image à l'écran
                        avatarImg.style.opacity = "1";
                    }
                    alert("Photo mise à jour !");
                } else {
                    throw new Error("Impossible de lier l'image au compte");
                }

            } catch (err) {
                console.error("Erreur téléversement :", err);
                if (avatarImg) avatarImg.style.opacity = "1";
            }
        });
    }

    const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        // Si le mode sombre est actif, on l'enlève et on enregistre 'light'
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            // Sinon, on l'ajoute et on enregistre 'dark'
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

    // 5. Gestion du bouton d'édition (redirection sans déconnexion)
    if (EditeProfilBtn) {
        EditeProfilBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "EditProfil.html";
        });
    }

    // 6. Gestion du bouton Déconnexion
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = "login.html";
        });
    }
});