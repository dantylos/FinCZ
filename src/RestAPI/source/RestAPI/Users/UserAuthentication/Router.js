const express = require('express');
const userService = require('./Service');
const { asyncHandler } = require('../../utils/routerUtils');

const router = express.Router();

router.post('/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const result = await userService.loginUser({ username, password });
    res.json(result);
}));

module.exports = router;
