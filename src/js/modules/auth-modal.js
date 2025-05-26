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

    signInBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });
}