import { initAuthModal } from './modules/auth-modal.js';
import { initSearch } from './modules/search.js';
import { initCookieConsent } from './modules/cookie-consent.js';
import { initValidation } from './modules/validation.js';
import { initSecurityQuestion } from './modules/security-question.js';
import { initFormHandler } from './modules/form-handler.js';
import { initThreadCreator } from './modules/thread-creator.js';
import { initThreadLoader } from './modules/thread-loader.js';
import { initCookiePolicy } from './modules/cookie-policy.js';
initSecurityQuestion();

// Initialize all modules once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const cookiePolicy = initCookiePolicy();
  cookiePolicy.init();
  initAuthModal();
  initSearch();
  initCookieConsent();
  initValidation();
  initFormHandler();
  initThreadCreator();
  initThreadLoader();
});