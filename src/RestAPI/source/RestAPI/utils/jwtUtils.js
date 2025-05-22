const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'default_secret';

const generateToken = (payload) => {
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
