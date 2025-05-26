// const { createResourceRouter } = require('../../utils/routerUtils.js');
// const { createThreadService } = require('../../Threads/CreateThread/Service.js');
//
// const threadRouter = createResourceRouter('/create', createThreadService, 'thread');
//
// module.exports = threadRouter;

const express = require('express');
const { authenticateToken } = require('../../utils/authMiddleware.js');
const { asyncHandler } = require('../../utils/routerUtils.js');
const { createThreadService } = require('./Service.js');

const router = express.Router();

// Создание треда (требует авторизации)
router.post('/create', authenticateToken, asyncHandler(async (req, res) => {
    // Добавляем author_id из токена и временные метки
    const threadData = {
        ...req.body,
        author_id: req.user.id, // Берем ID из JWT токена
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    const thread = await createThreadService(threadData);
    res.status(201).json(thread);
}));

module.exports = router;