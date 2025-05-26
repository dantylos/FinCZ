const express = require('express');
const userService = require('./Service');
const { asyncHandler } = require('../../utils/routerUtils');
const { verifyToken } = require('../../utils/jwtUtils');

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
    const result = await userService.loginUser({ username, password });
    res.json(result);
}));

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

module.exports = router;
