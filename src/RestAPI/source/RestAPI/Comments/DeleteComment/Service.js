const { deleteResourceRouter } = require('../../utils/routerUtils.js');
const { deleteCommentService } = require('./Service.js');

const deleteCommentRouter = deleteResourceRouter('', deleteCommentService, 'comment');

module.exports = deleteCommentRouter;