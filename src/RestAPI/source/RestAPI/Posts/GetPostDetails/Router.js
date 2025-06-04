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

    const postDetail = await getPostDetailService(postId);

    if (!postDetail) {
        return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(postDetail);
}));

module.exports = router;