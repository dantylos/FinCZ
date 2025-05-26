const { executeQuery } = require('../../utils/dbUtils');

// Получение всех тредов с информацией об авторе и последнем посте
const getAllThreads = async () => {
    const query = `
        SELECT
            t.id,
            t.title,
            t.body,
            t.category,
            t.created_at,
            t.updated_at,
            u.username as author_username,
            u.id as author_id,
            lp.content as last_post_content,
            lp.created_at as last_post_date
        FROM threads t
                 LEFT JOIN users u ON t.author_id = u.id
                 LEFT JOIN LATERAL (
            SELECT content, created_at
            FROM posts p
            WHERE p.thread_id = t.id
            ORDER BY p.created_at DESC
            LIMIT 1
            ) lp ON true
        ORDER BY t.created_at DESC
    `;

    return await executeQuery(query);
};

module.exports = {
    getAllThreads
};