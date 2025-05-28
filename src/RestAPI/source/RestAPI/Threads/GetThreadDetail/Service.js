const { getThreadById, getThreadPosts } = require('./Repository');

const getThreadDetailService = async (threadId) => {
    const thread = await getThreadById(threadId);

    if (!thread) {
        throw new Error('Thread not found');
    }

    const posts = await getThreadPosts(threadId);

    const formattedThread = {
        id: thread.id,
        title: thread.title,
        body: thread.body,
        category: thread.category,
        author: {
            id: thread.author_id,
            username: thread.author_username || 'Unknown User'
        },
        created_at: thread.created_at,
        updated_at: thread.updated_at,
        formatted_date: formatDate(thread.created_at)
    };

    const formattedPosts = posts.map(post => ({
        id: post.id,
        content: post.content,
        author: {
            id: post.author_id,
            username: post.author_username || 'Unknown User'
        },
        created_at: post.created_at,
        updated_at: post.updated_at,
        formatted_date: formatDate(post.created_at),
        last_comment: post.last_comment_content ? {
            content: post.last_comment_content,
            author: post.last_comment_author,
            date: post.last_comment_date,
            formatted_date: formatDate(post.last_comment_date)
        } : null
    }));

    return {
        thread: formattedThread,
        posts: formattedPosts
    };
};

// Additional helper function for formatting dates
const formatDate = (date) => {
    if (!date) return '';

    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
};

module.exports = {
    getThreadDetailService
};