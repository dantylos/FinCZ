import { qs } from '../utils/dom-utils.js';

// API URL for post rendering
const API_BASE_URL = 'https://financecz.onrender.com/api/threads';

// Fetch info about a certain thread
const fetchThreadPosts = async (threadId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${threadId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.posts || [];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

// Generating an HTML element for a post
const createPostElement = (post) => {
    const li = document.createElement('li');
    li.className = 'post-item';

    // HTML element for the last comment preview
    let commentPreview = '';
    if (post.last_comment && post.last_comment.content) {
        commentPreview = `
            <div class="post-comment-preview">
                <span class="comment-author">${escapeHtml(post.last_comment.author)}</span>
                <p class="comment-preview-text">${escapeHtml(post.last_comment.content.substring(0, 100))}${post.last_comment.content.length > 100 ? '...' : ''}</p>
                <div class="time"><time class="comment-timestamp">${post.last_comment.formatted_date}</time></div>
            </div>
        `;
    }

    li.innerHTML = `
        <div class="post-header">
            <span class="post-author">${escapeHtml(post.author.username)}</span>
            <time class="post-timestamp">${post.formatted_date}</time>
        </div>
        <div class="post-body">
            <p class="post-content-preview">${escapeHtml(post.content)}</p>
            <a href="post-page.html?id=${post.id}" class="post-view-full">View full</a>
        </div>
        ${commentPreview}
        <div class="post-footer">
            <a href="post-page.html?id=${post.id}#comments" class="view-all-comments">View all comments</a>
        </div>
    `;

    return li;
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

// Rendering the posts for a certain thread
const renderPosts = async (threadId, targetElementId = '#postList') => {
    console.log('renderPosts called for thread:', threadId);

    const postList = qs(targetElementId);
    if (!postList) {
        console.log('postList element not found');
        return;
    }

    postList.innerHTML = '<li class="loading">Loading posts...</li>';

    try {
        const posts = await fetchThreadPosts(threadId);

        postList.innerHTML = '';

        if (posts.length === 0) {
            postList.innerHTML = '<li class="no-posts">No posts yet. Be the first to post!</li>';
            return;
        }

        posts.forEach(post => {
            const postElement = createPostElement(post);
            postList.appendChild(postElement);
        });

        console.log(`Rendered ${posts.length} posts`);
    } catch (error) {
        console.error('Error rendering posts:', error);
        postList.innerHTML = '<li class="error">Error loading posts</li>';
    }
};

const refreshPosts = (threadId, targetElementId = '#postList') => {
    renderPosts(threadId, targetElementId);
};

// Post rendering initialization
export const initPostLoader = (threadId, targetElementId = '#postList') => {
    if (!threadId) {
        console.error('Thread ID is required for post loader');
        return null;
    }

    renderPosts(threadId, targetElementId);

    return {
        refreshPosts: () => refreshPosts(threadId, targetElementId),
        renderPosts: () => renderPosts(threadId, targetElementId),
        fetchThreadPosts: () => fetchThreadPosts(threadId)
    };
};