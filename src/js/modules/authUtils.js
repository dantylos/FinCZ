export const AuthUtils = {

    // Checks for cookie agreement (used by form-handler.js)
    canLogin: () => {
        return localStorage.getItem('cookieAgreement') === 'accepted';
    },

    isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    },

    getCurrentUser() {
        const token = this.getToken();
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                id: payload.id,
                username: payload.username,
                email: payload.email,
                role: payload.role,
                legal_names: payload.legal_names
            };
        } catch {
            return null;
        }
    },

    // Create a header for API requests with auth token
    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
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
    setToken: (token, username) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
    },

    getToken: () => {
        return localStorage.getItem('authToken');
    },

    removeToken: () => {
        localStorage.removeItem('authToken');
    },

    // Logout
    logout() {
        this.removeToken();
        window.location.href = 'index.html';
    }
};