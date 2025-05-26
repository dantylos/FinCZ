// Posts/CreatePost/Router.js
const express = require('express');
const { createResourceRouter } = require('../../utils/routerUtils.js');
const { createPostService } = require('./Service.js');

const postCreateRouter = createResourceRouter('/', createPostService, 'post');

const router = express.Router();
router.use('/', postCreateRouter); // POST-запросы пойдут на '/'

module.exports = router;
