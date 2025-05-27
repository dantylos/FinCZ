const express = require('express');
const { asyncHandler } = require('../../utils/routerUtils');
const { getThreadDetailService } = require('./Service');

const router = express.Router();

// GET /threads/:id - получить детальную информацию о треде и его постах
router.get('/:id', asyncHandler(async (req, res) => {
    const threadId = req.params.id;

    if (!threadId) {
        return res.status(400).json({ error: 'Thread ID is required' });
    }

    try {
        const threadDetail = await getThreadDetailService(threadId);
        res.status(200).json(threadDetail);
    } catch (error) {
        if (error.message === 'Thread not found') {
            return res.status(404).json({ error: 'Thread not found' });
        }
        throw error; // Re-throw other errors to be handled by asyncHandler
    }
}));

module.exports = router;