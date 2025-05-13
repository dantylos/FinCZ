const express = require('express');
const { deleteResourceRouter } = require('../../utils/routerUtils.js');
const { deleteCommentService } = require('./Service.js');

const commentDeleteRouter = deleteResourceRouter('/:id', deleteCommentService, 'comment');

const router = express.Router();
router.use('/', commentDeleteRouter);

module.exports = router;