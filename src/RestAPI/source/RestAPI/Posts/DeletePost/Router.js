const { executeFunctionCall } = require('../../utils/dbUtils.js');

const deletePost = async (postId) => {
    return await executeFunctionCall('delete_post', [postId]);
};

module.exports = { deletePost };