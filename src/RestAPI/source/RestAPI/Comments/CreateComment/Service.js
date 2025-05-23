const { createComment } = require('../../Comments/CreateComment/Repository.js');
const { createGenericService } = require('../../utils/serviceUtils.js');

const createCommentService = createGenericService(createComment);

module.exports = { createCommentService };