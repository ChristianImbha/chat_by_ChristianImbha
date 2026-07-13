/const loginForm = document.getElementById("login-form"); // Ajuste l'ID selon ton HTML
const loginBtn = document.getElementById("login-btn");
const loginSpinner = document.getElementById("login-spinner");
const loginBtnText = document.getElementById("login-btn-text");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 1. Activation du micro-loader
        if (loginBtn) loginBtn.disabled = true;
        if (loginSpinner) loginSpinner.classList.remove("hidden");
        if (loginBtnText) loginBtnText.textContent = "Connexion en cours...";

        try {
            // Remplace ce fetch par ta logique existante de login
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailInput.value,
                    password: passwordInput.value
                })
            });

            const result = await response.json();

            if (response.ok) {
                // Connexion réussie : on stocke le token et on redirige
                localStorage.setItem("token", result.token || result.data?.token);
                localStorage.setItem("userId", result.userId || result.data?.userId || result.data?.user?.id);
                window.location.href = "chat.html";
            } else {
                // L'API renvoie une erreur (ex: mauvais mot de passe)
                alert(result.message || "Identifiants incorrects.");
                resetLoginButton(); // On remet le bouton normal
            }

        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            alert("Une erreur réseau est survenue. Veuillez réessayer.");
            resetLoginButton(); // On remet le bouton normal en cas de crash
        }
    });
}

// Fonction pour remettre le bouton de connexion à son état initial
function resetLoginButton() {
    if (loginBtn) loginBtn.disabled = false;
    if (loginSpinner) loginSpinner.classList.add("hidden");
    if (loginBtnText) loginBtnText.textContent = "Se connecter";
}
