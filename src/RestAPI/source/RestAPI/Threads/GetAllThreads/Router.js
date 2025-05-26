const express = require('express');
const { asyncHandler } = require('../../Utils/routerUtils');
const { getAllThreadsService } = require('./Service');

const router = express.Router();

// GET /threads - получить все треды
router.get('/', asyncHandler(async (req, res) => {
    const threads = await getAllThreadsService();
    res.status(200).json(threads);
}));

module.exports = router;