const { createResourceRouter } = require('../../utils/routerUtils.js');
const { createCommentService } = require('../../Comments/CreateComment/Service.js');

const commentRouter = createResourceRouter('/create', createCommentService, 'comment');

module.exports = commentRouter;