const { deletePost } = require('./Repository.js');
const { deleteGenericService } = require('../../utils/serviceUtils.js');

const deletePostService = deleteGenericService(deletePost);

module.exports = { deletePostService };