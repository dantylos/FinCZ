const { createResource } = require('../../utils/dbUtils.js');

const createComment = async (comment) => {
    const fields = [
        'post_id', 'author_id', 'content', 'created_at'
    ];
    return await createResource('comments', comment, fields);
};

module.exports = { createComment };