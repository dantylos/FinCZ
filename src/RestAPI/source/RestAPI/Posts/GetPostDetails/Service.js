const { getPostById, getPostComments } = require('./Repository');

const getPostDetailService = async (postId) => {
    const post = await getPostById(postId);

    if (!post) {
        throw new Error('Post not found');
    }

    const comments = await getPostComments(postId);

    const formattedPost = {
        id: post.id,
        content: post.content,
        thread_id: post.thread_id,
        author: {
            id: post.author_id,
            username: post.author_username || 'Unknown User'
        },
        created_at: post.created_at,
        updated_at: post.updated_at,
        formatted_date: formatDate(post.created_at)
    };

    const formattedComments = comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        author: {
            id: comment.author_id,
            username: comment.author_username || 'Unknown User'
        },
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        formatted_date: formatDate(comment.created_at)
    }));

    return {
        post: formattedPost,
        comments: formattedComments
    };
};

// Helper function for formatting dates
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
    getPostDetailService
};