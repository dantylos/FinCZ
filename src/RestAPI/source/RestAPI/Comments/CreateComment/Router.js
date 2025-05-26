const { createResourceRouter } = require('../../utils/routerUtils.js');
const { createCommentService } = require('./Service.js');

const commentRouter = createResourceRouter('/create', createCommentService, 'comment');

module.exports = commentRouter;