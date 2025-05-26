// const express = require('express');
// const router = express.Router();
// const { createUserService } = require('./Service');
//
// router.post('/create', async (req, res) => {
//     try {
//         const user = await createUserService(req.body);
//         res.status(201).json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// });
//
// module.exports = router;

const express = require('express');
const { createUser } = require('./Repository.js');
const { createUserService } = require('./Service');
const { asyncHandler } = require('../../utils/routerUtils.js');

const router = express.Router();

const userService = createUserService(createUser);

router.post('/create', asyncHandler(async (req, res) => {
    const user = await userService(req.body);
    res.status(201).json(user);
}));

module.exports = router;