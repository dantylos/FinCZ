const { deleteThread } = require('../../Threads/DeleteThread/Repository.js');
const { deleteGenericService } = require('../../utils/serviceUtils.js');

const deleteThreadService = deleteGenericService(deleteThread);

module.exports = { deleteThreadService };