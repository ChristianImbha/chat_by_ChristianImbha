document.addEventListener("DOMContentLoaded", () => {
    // 1. Récupération des données stockées par chat.js
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    const savedAvatar = localStorage.getItem("userAvatar");

    // 2. Ciblage des éléments HTML de ta page profil (adapte les ID selon ton HTML)
    const profileNameEl = document.getElementById("profile-display-name");
    const profileEmailEl = document.getElementById("profile-display-email");
    const profileAvatarEl = document.getElementById("profile-display-avatar");

    // 3. Injection des données dans le HTML
    if (profileNameEl && savedName) {
        profileNameEl.textContent = savedName;
    }
    if (profileEmailEl && savedEmail) {
        profileEmailEl.textContent = savedEmail;
    }
    if (profileAvatarEl && savedAvatar) {
        profileAvatarEl.src = savedAvatar;
    }
});