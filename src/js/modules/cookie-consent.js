export function initCookieConsent() {
    const modal = document.getElementById('policyModal');
    const saveBtn = document.getElementById('savePreferences');
    const marketingToggle = document.getElementById('marketingToggle');
    const rejectAllBtn = document.getElementById('rejectAllCookies');

    // Check if elements exist
    if (!modal || !saveBtn || !marketingToggle || !rejectAllBtn) {
        console.error('Cookie consent elements not found');
        return;
    }

    // Check if consent has already been given
    const cookieAgreement = localStorage.getItem('cookieAgreement');
    const marketingAccepted = localStorage.getItem('marketingAccepted');

    // Show modal only if consent has not been given
    if (!cookieAgreement) {
        showModal();
        lockScroll();
    }

    // Set toggle state based on saved preferences
    marketingToggle.checked = marketingAccepted === 'true';

    // Handler for "Save Preferences" button
    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Save consent and marketing preferences
        localStorage.setItem('cookieAgreement', 'accepted');
        localStorage.setItem('marketingAccepted', marketingToggle.checked.toString());

        hideModal();
        unlockScroll();

        console.log('Cookie preferences saved successfully');
    });

    // Handler for "Reject" button
    rejectAllBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Save rejection
        localStorage.setItem('cookieAgreement', 'rejected');
        localStorage.setItem('marketingAccepted', 'false');

        hideModal();
        unlockScroll();

        // Show warning
        alert('You have rejected our privacy policy. You will not be able to log in or register until you accept it.');

        console.log('Cookie agreement rejected');
    });

    // Prevent modal closing on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            e.preventDefault();
            alert('Please make a choice about our privacy policy before continuing.');
        }
    });

    // Modal management functions
    function showModal() {
        modal.style.display = 'flex';
        modal.classList.add('active');
    }

    function hideModal() {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }

    function lockScroll() {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    }

    function unlockScroll() {
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
    }

    // Return API for external use
    return {
        showModal,
        hideModal,
        checkCookieAgreement: () => {
            const agreement = localStorage.getItem('cookieAgreement');
            return agreement === 'accepted' || agreement === 'rejected';
        },
        hasCookieAgreement: () => {
            return localStorage.getItem('cookieAgreement') !== null;
        },
        isCookieAgreementAccepted: () => {
            return localStorage.getItem('cookieAgreement') === 'accepted';
        },
        canLogin: () => {
            // User can only log in if they have accepted the cookie agreement
            return localStorage.getItem('cookieAgreement') === 'accepted';
        }
    };
}