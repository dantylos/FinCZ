const form = document.getElementById('accountForm');
const result = document.getElementById('result');
import { AuthUtils } from './authUtils.js';

form.addEventListener('submit', function (e) {
    e.preventDefault();
    result.textContent = "";

    const email = form.email.value.trim();
    const username = form.username.value.trim();

    let errors = [];
    if (!username) errors.push("Username is required.");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Valid primary email is required.");
    }

    if (errors.length > 0) {
        result.innerHTML = '<div class="error">' + errors.join('<br>') + '</div>';
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.specialist = form.specialist.checked;
    data.agreement = form.agreement.checked;

    // Simulate saving to LocalStorage
    localStorage.setItem("userAccount", JSON.stringify(data));

    console.log("Saved to localStorage:", data);
    result.textContent = "✅ Profile saved (mock) — email notification would be triggered for changes to username, email, name, specialist verification, and account status.";
});


// Link referrer
document.addEventListener("DOMContentLoaded", () => {
    const closeLink = document.querySelector(".account-menu a");

    closeLink.addEventListener("click", (event) => {
        event.preventDefault();

        // If there is a referrer, go back to it; otherwise fallback to homepage
        if (document.referrer && document.referrer !== location.href) {
            window.location.href = document.referrer;
        } else {
            window.location.href = "../../../index.html"; // fallback
        }
    });
});

// Logout
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            AuthUtils.logout();
        });
    }
});