const { deleteResourceRouter } = require('../../utils/routerUtils.js');
const { deleteThreadService } = require('../../Threads/DeleteThread/Service.js');

const deleteThreadRouter = deleteResourceRouter('', deleteThreadService, 'thread');

module.exports = deleteThreadRouter;