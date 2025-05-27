const { executeQuery, executeQuerySingle } = require('../../utils/dbUtils');

// Получение конкретного треда с информацией об авторе
const getThreadById = async (threadId) => {
    const query = `
        SELECT
            t.id,
            t.title,
            t.body,
            t.category,
            t.created_at,
            t.updated_at,
            u.username as author_username,
            u.id as author_id
        FROM threads t
        LEFT JOIN users u ON t.author_id = u.id
        WHERE t.id = $1
    `;

    return await executeQuerySingle(query, [threadId]);
};

// Получение всех постов треда с информацией об авторах и последних комментариях
const getThreadPosts = async (threadId) => {
    const query = `
        SELECT
            p.id,
            p.content,
            p.created_at,
            p.updated_at,
            u.username as author_username,
            u.id as author_id,
            lc.content as last_comment_content,
            lc.created_at as last_comment_date,
            lc_user.username as last_comment_author
        FROM posts p
        LEFT JOIN users u ON p.author_id = u.id
        LEFT JOIN LATERAL (
            SELECT c.content, c.created_at, cu.username
            FROM comments c
            LEFT JOIN users cu ON c.author_id = cu.id
            WHERE c.post_id = p.id
            ORDER BY c.created_at DESC
            LIMIT 1
        ) lc(content, created_at, username) ON true
        LEFT JOIN users lc_user ON lc_user.username = lc.username
        WHERE p.thread_id = $1
        ORDER BY p.created_at ASC
    `;

    return await executeQuery(query, [threadId]);
};

module.exports = {
    getThreadById,
    getThreadPosts
};