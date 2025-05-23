const { deleteResourceRouter } = require('../../utils/routerUtils.js');
const { deletePostService } = require('../../Posts/DeletePost/Service.js');

const deletePostRouter = deleteResourceRouter('', deletePostService, 'post');

module.exports = deletePostRouter;