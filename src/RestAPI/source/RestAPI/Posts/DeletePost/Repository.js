const { deleteResourceRouter } = require('../../utils/routerUtils.js');
const { deletePostService } = require('./Service.js');

const deletePostRouter = deleteResourceRouter('', deletePostService, 'post');

module.exports = deletePostRouter;