const { createResourceRouter } = require('../../utils/routerUtils.js');
const { createThreadService } = require('./Service.js');

const threadRouter = createResourceRouter('/create', createThreadService, 'thread');

module.exports = threadRouter;