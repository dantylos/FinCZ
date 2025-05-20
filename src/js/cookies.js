document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('policyModal');
    const saveBtn = document.getElementById('savePreferences');
    const marketingToggle = document.getElementById('marketingToggle');

    // Check existing preferences
    const essentialsAccepted = localStorage.getItem('essentialsAccepted');
    const marketingAllowed = localStorage.getItem('marketingAllowed');


    // Reject all cookies
    const rejectAllBtn = document.getElementById('rejectAllCookies');
    if (rejectAllBtn) {
        rejectAllBtn.addEventListener('click', () => {
            localStorage.setItem('essentialsAccepted', 'false');
            localStorage.setItem('marketingAllowed', 'false');
            hideModal();
            unlockScroll();
        });

    }
    if (!essentialsAccepted) {
        showModal();
        lockScroll();
    }

    // Set initial toggle state
    marketingToggle.checked = marketingAllowed === 'true';

    saveBtn.addEventListener('click', () => {
        // Essentials are mandatory
        localStorage.setItem('essentialsAccepted', 'true');

        // Save marketing preference
        localStorage.setItem('marketingAllowed', marketingToggle.checked.toString());

        hideModal();
        unlockScroll();

        // Initialize services based on preferences
        // initializeServices();
    });

    function showModal() {
        modal.classList.add('active');
    }

    function hideModal() {
        modal.classList.remove('active');
    }

    function lockScroll() {
        document.body.classList.add('modal-open');
    }

    function unlockScroll() {
        document.body.classList.remove('modal-open');
    }

    function initializeServices() {
        if (localStorage.getItem('marketingAllowed') === 'true') {
            // Enable marketing scripts
        }
    }
});