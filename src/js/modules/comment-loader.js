import { qs } from '../utils/dom-utils.js';

// API URL for comment rendering
const API_BASE_URL = 'https://financecz.onrender.com/api/posts';

// Fetch info about a certain post
const fetchPostComments = async (postId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${postId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.comments || [];
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
};

// Generating an HTML element for a comment
const createCommentElement = (comment) => {
    const div = document.createElement('div');
    div.className = 'post-comment-preview';

    div.innerHTML = `
        <span class="comment-author">${escapeHtml(comment.author.username)}</span>
        <p class="comment-preview-text">${escapeHtml(comment.content)}</p>
        <div class="time"><time class="comment-timestamp">${comment.formatted_date}</time></div>
    `;

    return div;
};

// HTML shielding
const escapeHtml = (text) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text ? text.replace(/[&<>"']/g, (m) => map[m]) : '';
};

// Rendering the comments for a certain post
const renderComments = async (postId, targetElementId = '#comments') => {
    console.log('renderComments called for post:', postId);

    const commentsContainer = qs(targetElementId);
    if (!commentsContainer) {
        console.log('comments container element not found');
        return;
    }

    commentsContainer.innerHTML = '<div class="loading">Loading comments...</div>';

    try {
        const comments = await fetchPostComments(postId);

        commentsContainer.innerHTML = '';

        if (comments.length === 0) {
            commentsContainer.innerHTML = '<div class="no-comments">No comments yet. Be the first to comment!</div>';
            return;
        }

        comments.forEach(comment => {
            const commentElement = createCommentElement(comment);
            commentsContainer.appendChild(commentElement);
        });

        console.log(`Rendered ${comments.length} comments`);
    } catch (error) {
        console.error('Error rendering comments:', error);
        commentsContainer.innerHTML = '<div class="error">Error loading comments</div>';
    }
};

const refreshComments = (postId, targetElementId = '#comments') => {
    renderComments(postId, targetElementId);
};

// Comment rendering initialization
export const initCommentLoader = (postId, targetElementId = '#comments') => {
    if (!postId) {
        console.error('Post ID is required for comment loader');
        return null;
    }

    renderComments(postId, targetElementId);

    return {
        refreshComments: () => refreshComments(postId, targetElementId),
        renderComments: () => renderComments(postId, targetElementId),
        fetchPostComments: () => fetchPostComments(postId)
    };
};