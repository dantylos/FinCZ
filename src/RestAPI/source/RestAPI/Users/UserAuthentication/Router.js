const express = require('express');
const userService = require('./Service');
const { asyncHandler } = require('../../utils/routerUtils');

// Сань, это я добавил Верификацию токена 
const { generateToken, verifyToken } = require('../../utils/jwtUtils');

const router = express.Router();

// Authentication middleware
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Login endpoint
router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        // Получаем данные пользователя из сервиса
        const user = await userService.loginUser({ username, password });

        // Генерируем JWT токен с данными пользователя
        const token = generateToken(user);

        // Возвращаем токен и безопасные данные пользователя
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                legal_names: user.legal_names,
                role: user.role || 'user'
            }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}));



// Сань, твой логин импорт намного лучше чем я раньше делал, харош

// Но я верну сюда профайл апдейт свой, ок?

// Вообще, если сломает код, удалить начиная с этого комента

// Update username endpoint
router.put('/profile/username', authenticateUser, asyncHandler(async (req, res) => {
    const { newUsername } = req.body;
    
    if (!newUsername) {
        return res.status(400).json({ error: 'New username is required' });
    }

    const result = await userService.updateUsername(req.user.userId, newUsername);
    res.json(result);
}));

// Update email endpoint
router.put('/profile/email', authenticateUser, asyncHandler(async (req, res) => {
    const { newEmail } = req.body;
    
    if (!newEmail) {
        return res.status(400).json({ error: 'New email is required' });
    }

    const result = await userService.updateEmail(req.user.userId, newEmail);
    res.json(result);
}));

// Update password endpoint
router.put('/profile/password', authenticateUser, asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current password and new password are required' });
    }

    const result = await userService.updatePassword(req.user.userId, currentPassword, newPassword);
    res.json(result);
}));


// и заканчивая тут

module.exports = router;