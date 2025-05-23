const { createPost } = require('../../Posts/CreatePost/Repository.js');
const { createGenericService } = require('../../utils/serviceUtils.js');

const createPostService = createGenericService(createPost);

module.exports = { createPostService };