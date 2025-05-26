const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'default_secret';

const generateToken = (user) => {
    // Включаем основные данные пользователя в токен
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role || 'user',
        legal_names: user.legal_names
    };

    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET);
    } catch {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};