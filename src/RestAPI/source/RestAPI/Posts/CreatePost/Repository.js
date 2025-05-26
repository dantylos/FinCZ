const { createResource } = require('../../utils/dbUtils.js');

const createPost = async (post) => {
    const fields = [
        'thread_id', 'author_id', 'content',
        'created_at', 'updated_at'
    ];
    return await createResource('posts', post, fields);
};

module.exports = { createPost };