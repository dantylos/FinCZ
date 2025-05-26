const { createThread } = require('./Repository.js');
const { createGenericService } = require('../../utils/serviceUtils.js');

const createThreadService = createGenericService(createThread);

module.exports = { createThreadService };