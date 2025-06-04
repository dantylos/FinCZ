import { AuthUtils } from './authUtils.js';

export function initAuthModal() {
    const signInBtn = document.getElementById('signInBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const registerBlock = document.getElementById('registerBlock');
    const signInBlock = document.getElementById('signInBlock');
    const showSignIn = document.getElementById('showSignIn');
    const showRegister = document.getElementById('showRegister');
    const siteHeader = document.querySelector('header');
    const content = document.querySelector('main');
    const authDisplayElement = document.getElementById('authDisplay');

    // Toggle visibility of register/login forms
    function toggleForms(showRegisterForm) {
        registerBlock.style.display = showRegisterForm ? '' : 'none';
        signInBlock.style.display = showRegisterForm ? 'none' : '';
        (showRegisterForm ? registerBlock : signInBlock).querySelector('input').focus();
    }

    function openModal() {
        toggleForms(true);
        modalOverlay.classList.add('active');
        siteHeader.style.filter = content.style.filter = 'blur(6px)';
        modalOverlay.querySelector('input').focus();
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        siteHeader.style.filter = content.style.filter = '';
    }

    showSignIn.addEventListener('click', e => {
        e.preventDefault();
        toggleForms(false);
    });

    showRegister.addEventListener('click', e => {
        e.preventDefault();
        toggleForms(true);
    });

    if (signInBtn) {
        signInBtn.addEventListener('click', openModal);
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });


    function updateAuthDisplay() {
        if (AuthUtils.isAuthenticated()) {
            const currentUser = AuthUtils.getCurrentUser();
            const username = currentUser ? currentUser.username : localStorage.getItem('username'); // Используем getCurrentUser для получения ника, если токен есть, иначе из localStorage
            if (username) {
                authDisplayElement.innerHTML = `<a href="src/pages/account.html">${username}</a>`;
            } else {
                // Если никнейм не найден даже в токене, но токен есть, показать "Sign In" (на всякий случай)
                authDisplayElement.innerHTML = `<button id="signInBtn" class="sign-in-btn">Sign In</button>`;
                document.getElementById('signInBtn').addEventListener('click', openModal);
            }
        } else {
            authDisplayElement.innerHTML = `<button id="signInBtn" class="sign-in-btn">Sign In</button>`;
            document.getElementById('signInBtn').addEventListener('click', openModal);
        }
    }

    // Вызываем функцию при инициализации
    updateAuthDisplay();

    // Добавляем функцию, которую можно вызвать из других модулей для обновления состояния
    window.updateAuthDisplay = updateAuthDisplay;
}