const express = require('express');
const userService = require('./Service');
const { asyncHandler } = require('../../utils/routerUtils');
const { generateToken } = require('../../utils/jwtUtils');

const router = express.Router();

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

module.exports = router;