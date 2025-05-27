// Утилиты для работы с авторизацией на frontend

export const AuthUtils = {
    // Получить токен из localStorage
    getToken() {
        return localStorage.getItem('authToken');
    },

    // Сохранить токен в localStorage
    setToken(token) {
        localStorage.setItem('authToken', token);
    },

    // Удалить токен из localStorage
    removeToken() {
        localStorage.removeItem('authToken');
    },

    // Проверить, авторизован ли пользователь
    isAuthenticated() {
        const token = this.getToken();
        if (!token) return false;

        try {
            // Проверяем, не истек ли токен
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    },

    // Checker for cookie agreement
    hasCookieAgreement() {
        const agreement = localStorage.getItem('cookieAgreement');
        return agreement === 'accepted';
    },

    // Saves cookie agreement status in localStorage
    setCookieAgreement(status) {
        localStorage.setItem('cookieAgreement', status);
    },

    // Login access checker
    canLogin() {
        return this.hasCookieAgreement();
    },

    // Получить данные пользователя из токена
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

    // Создать заголовки для API запросов с токеном
    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    },

    // Выход из системы
    logout() {
        this.removeToken();
        // Можете добавить редирект на главную страницу
        window.location.reload();
    }
};