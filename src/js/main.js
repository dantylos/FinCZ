import { initAuthModal } from './modules/auth-modal.js';
import { initSearch } from './modules/search.js';
import { initTrending } from './modules/trending.js';
import { initCookieConsent } from './modules/cookie-consent.js';
import { initValidation } from './modules/validation.js';
import { initSecurityQuestion } from './modules/security-question.js';
import { initFormHandler } from './modules/form-handler.js';
import { initThreadCreator } from './modules/thread-creator.js';
initSecurityQuestion();

// Initialize all modules once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initAuthModal();
  initSearch();
  initTrending();
  initCookieConsent();
  initValidation();
  initFormHandler();
  initThreadCreator();
});