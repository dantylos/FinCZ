const express = require('express');
const { deleteResourceRouter } = require('../../utils/routerUtils.js');
const { deletePostService } = require('./Service.js'); // Предполагается, что сервис находится в этом же каталоге

const postDeleteRouter = deleteResourceRouter('/:id', deletePostService, 'post');

const router = express.Router();
router.use('/', postDeleteRouter); // Монтируем deleteResourceRouter по корневому пути этого роутера

module.exports = router;