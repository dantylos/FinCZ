const { deleteThread } = require('./Repository.js');
const { deleteGenericService } = require('../../utils/serviceUtils.js');

const deleteThreadService = deleteGenericService(deleteThread);

module.exports = { deleteThreadService };