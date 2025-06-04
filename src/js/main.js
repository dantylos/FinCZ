import { initAuthModal } from './modules/auth-modal.js';
import { initSearch } from './modules/search.js';
import { initCookieConsent } from './modules/cookie-consent.js';
import { initValidation } from './modules/validation.js';
import { initSecurityQuestion } from './modules/security-question.js';
import { initFormHandler } from './modules/form-handler.js';
import { initThreadCreator } from './modules/thread-creator.js';
import { initThreadLoader } from './modules/thread-loader.js';
import { AuthUtils } from './modules/authUtils.js';

// Initialize security question before DOM load (as it was)
initSecurityQuestion();

// Initialize all modules once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cookie consent
  const cookieConsent = initCookieConsent();

  // Initialize other modules
  initAuthModal();
  initSearch();
  initValidation();
  initFormHandler();
  initThreadCreator();
  initThreadLoader();

  // Add an additional check for the Sign In button
  const signInBtn = document.getElementById('signInBtn');
  if (signInBtn) {
    signInBtn.addEventListener('click', (e) => {
      if (!cookieConsent.canLogin()) {
        e.preventDefault();
        e.stopPropagation();
        alert('Please accept our privacy policy first to access login functionality.');
        cookieConsent.showModal();
        return false;
      }
    });
  }

  console.log('Application initialized');
});