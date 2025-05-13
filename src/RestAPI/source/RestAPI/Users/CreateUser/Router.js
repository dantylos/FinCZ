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


const { createResourceRouter } = require('../../utils/routerUtils.js');
const { createUserService } = require('./Service');

const userRouter = createResourceRouter('/create', createUserService, 'user');

module.exports = userRouter;