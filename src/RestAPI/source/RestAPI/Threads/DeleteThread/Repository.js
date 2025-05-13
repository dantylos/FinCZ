const { executeFunctionCall } = require('../../utils/dbUtils.js');

const deleteThread = async (threadId) => {
    return await executeFunctionCall('delete_thread', [threadId]);
};

module.exports = { deleteThread };