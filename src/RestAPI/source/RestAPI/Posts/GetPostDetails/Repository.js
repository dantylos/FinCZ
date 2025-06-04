const { executeQuery, executeQuerySingle } = require('../../utils/dbUtils');

// Get details of a exact post
const getPostById = async (postId) => {
    const query = `
        SELECT
            p.id,
            p.content,
            p.thread_id,
            p.created_at,
            p.updated_at,
            u.username as author_username,
            u.id as author_id
        FROM posts p
                 LEFT JOIN users u ON p.author_id = u.id
        WHERE p.id = $1
    `;

    return await executeQuerySingle(query, [postId]);
};

// Get all comments connected to a post
const getPostComments = async (postId) => {
    const query = `
        SELECT
            c.id,
            c.content,
            c.created_at,
            u.username as author_username,
            u.id as author_id
        FROM comments c
                 LEFT JOIN users u ON c.author_id = u.id
        WHERE c.post_id = $1
        ORDER BY c.created_at ASC
    `;

    return await executeQuery(query, [postId]);
};

module.exports = {
    getPostById,
    getPostComments
};