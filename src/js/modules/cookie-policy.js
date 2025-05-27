import { AuthUtils } from './authUtils.js';

export function initCookiePolicy() {
    const policyModal = document.getElementById('policyModal');
    const savePreferencesBtn = document.getElementById('savePreferences');
    const rejectAllCookiesBtn = document.getElementById('rejectAllCookies');
    const marketingToggle = document.getElementById('marketingToggle');

    function checkCookieAgreement() {
        if (!AuthUtils.hasCookieAgreement()) {
            showPolicyModal();
        }
    }

    function showPolicyModal() {
        policyModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Предотвращаем скролл фона
    }

    function hidePolicyModal() {
        policyModal.style.display = 'none';
        document.body.style.overflow = ''; // Восстанавливаем скролл
    }

    if (savePreferencesBtn) {
        savePreferencesBtn.addEventListener('click', function() {
            const marketingAccepted = marketingToggle.checked;

            AuthUtils.setCookieAgreement('accepted');
            localStorage.setItem('marketingAccepted', marketingAccepted ? 'true' : 'false');
            hidePolicyModal();
            console.log('Cookie preferences saved successfully');
        });
    }


    if (rejectAllCookiesBtn) {
        rejectAllCookiesBtn.addEventListener('click', function() {
            AuthUtils.setCookieAgreement('rejected');
            localStorage.setItem('marketingAccepted', 'false');

            hidePolicyModal();


            alert('You have rejected our privacy policy. You will not be able to log in or register until you accept it.');

            console.log('Cookie agreement rejected');
        });
    }


    if (marketingToggle) {
        marketingToggle.addEventListener('change', function() {
            console.log('Marketing toggle changed:', this.checked);
        });
    }


    if (policyModal) {
        policyModal.addEventListener('click', function(e) {
            if (e.target === policyModal) {
                // Do not let enter without making a choice
                alert('Please make a choice about our privacy policy before continuing.');
            }
        });
    }

    // Initialization on the webpage start
    function init() {
        checkCookieAgreement();
    }

    // Возвращаем функцию инициализации
    return {
        init,
        checkCookieAgreement,
        showPolicyModal,
        hidePolicyModal
    };
}