export const AuthUtils = {
    // Checks for cookie agreement (used by form-handler.js)
    canLogin: () => {
        return localStorage.getItem('cookieAgreement') === 'accepted';
    },

    // Checks for any cookie agreement (for compatibility)
    hasCookieAgreement: () => {
        return localStorage.getItem('cookieAgreement') !== null;
    },

    // Sets the cookie agreement (if needed from other places)
    setCookieAgreement: (status) => {
        localStorage.setItem('cookieAgreement', status);
    },

    // Gets the cookie agreement status
    getCookieAgreement: () => {
        return localStorage.getItem('cookieAgreement');
    },

    // Token management
    setToken: (token) => {
        localStorage.setItem('authToken', token);
    },

    getToken: () => {
        return localStorage.getItem('authToken');
    },

    removeToken: () => {
        localStorage.removeItem('authToken');
    },

    // Checks authentication status
    isLoggedIn: () => {
        return !!localStorage.getItem('authToken');
    },

    // Logout
    logout: () => {
        localStorage.removeItem('authToken');
        // Additional cleanup logic can be added here
    }
};