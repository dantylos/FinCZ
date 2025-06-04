const express = require('express');
const { asyncHandler } = require('../../utils/routerUtils');
const { getPostDetailService } = require('./Service');

const router = express.Router();

// Get details of a post by its ID
router.get('/:id', asyncHandler(async (req, res) => {
    const postId = req.params.id;

    if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        const postDetail = await getPostDetailService(postId);
        res.status(200).json(postDetail);
    } catch (error) {
        if (error.message === 'Post not found') {
            return res.status(404).json({ error: 'Post not found' });
        }
        throw error; // Re-throw other errors to be handled by asyncHandler
    }
}));

module.exports = router;