const { createResource } = require('../../utils/dbUtils.js');

const createThread = async (thread) => {
    const fields = [
        'title', 'body', 'author_id', 'category',
        'created_at', 'updated_at'
    ];
    return await createResource('threads', thread, fields);
};

module.exports = { createThread }