export function initCookieConsent() {
    const modal = document.getElementById('policyModal');
    const saveBtn = document.getElementById('savePreferences');
    const marketingToggle = document.getElementById('marketingToggle');
    const rejectAllBtn = document.getElementById('rejectAllCookies');

    const essentialsAccepted = localStorage.getItem('essentialsAccepted');
    const marketingAllowed = localStorage.getItem('marketingAllowed');

    if (!essentialsAccepted) {
        showModal();
        lockScroll();
    }

    marketingToggle.checked = marketingAllowed === 'true';

    saveBtn.addEventListener('click', () => {
        localStorage.setItem('essentialsAccepted', 'true');
        localStorage.setItem('marketingAllowed', marketingToggle.checked.toString());
        hideModal();
        unlockScroll();
    });

    if (rejectAllBtn) {
        rejectAllBtn.addEventListener('click', () => {
            localStorage.setItem('essentialsAccepted', 'false');
            localStorage.setItem('marketingAllowed', 'false');
            hideModal();
            unlockScroll();
        });
    }

    function showModal() { modal.classList.add('active'); }
    function hideModal() { modal.classList.remove('active'); }
    function lockScroll() { document.body.classList.add('modal-open'); }
    function unlockScroll() { document.body.classList.remove('modal-open'); }
}