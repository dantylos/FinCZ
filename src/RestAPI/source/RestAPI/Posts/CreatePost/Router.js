const express = require('express');
const { authenticateToken } = require('../../utils/authMiddleware.js');
const { asyncHandler } = require('../../utils/routerUtils.js');
const { createPostService } = require('./Service.js');

const router = express.Router();


router.post('/create', authenticateToken, asyncHandler(async (req, res) => {
    // Check is there a such thread
    if (!req.body.thread_id) {
        return res.status(400).json({ error: 'Thread ID is required' });
    }

    const postData = {
        ...req.body,
        author_id: req.user.id, // Берем ID из JWT токена
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    const post = await createPostService(postData);
    res.status(201).json(post);
}));

module.exports = router;