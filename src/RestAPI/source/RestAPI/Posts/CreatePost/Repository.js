const { createResource } = require('../../utils/dbUtils.js');

const createPost = async (post) => {
    const now = new Date().toISOString();
    const data = {
        ...post,
        created_at: now,        // Autofilling date and time of creation
        updated_at: now         // and last updation
    };
    const fields = [
        'thread_id', 'author_id', 'content',
        'created_at', 'updated_at'
    ];
    return await createResource('posts', data, fields);
};

module.exports = { createPost };