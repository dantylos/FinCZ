const { executeFunctionCall } = require('../../utils/dbUtils.js');

const deleteComment = async (commentId) => {
    return await executeFunctionCall('delete_comment', [commentId]);
};

module.exports = { deleteComment };