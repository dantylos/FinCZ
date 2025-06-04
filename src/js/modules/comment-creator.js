import { AuthUtils } from './authUtils.js';

// API URL for comment creation
const API_BASE_URL = 'https://financecz.onrender.com/api/comments';

// Comment creation function
async function createComment(commentData) {
    if (!AuthUtils.isAuthenticated()) {
        alert('Please log in to create a comment');
        return false;
    }

    if (!commentData.post_id) {
        alert('Post ID is required');
        return false;
    }

    if (!commentData.content || !commentData.content.trim()) {
        alert('Comment content is required');
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/create`, {
            method: 'POST',
            headers: {
                ...AuthUtils.getAuthHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post_id: commentData.post_id,
                content: commentData.content.trim()
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.error || 'Failed to create comment');
            return false;
        } else {
            console.log('Created comment:', result);
            return result;
        }
    } catch (error) {
        console.error('Error creating comment:', error);
        alert('Request failed. Please try again.');
        return false;
    }
}

// Comment creation form initialization function
function initCommentForm(postId, onCommentCreated = null) {
    const commentForm = document.getElementById('createCommentForm');
    const commentCreatorSection = commentForm?.parentElement ||
        document.querySelector('.comment-creator');

    // Form is hidden if user is not logged in
    if (!AuthUtils.isAuthenticated()) {
        if (commentCreatorSection) {
            commentCreatorSection.style.display = 'none';
        }
        return;
    }

    if (commentForm) {
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const content = formData.get('commentContent');

            const submitButton = commentForm.querySelector('button[type="submit"]') ||
                document.getElementById('postCommentBtn');

            // Blocking the submit button while the request is being processed to prevent double submissions
            if (submitButton) {
                submitButton.disabled = true;
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Posting...';

                const resetButton = () => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                };

                const commentData = {
                    post_id: postId,
                    content: content
                };

                const result = await createComment(commentData);

                if (result) {
                    commentForm.reset();

                    if (onCommentCreated && typeof onCommentCreated === 'function') {
                        onCommentCreated(result);
                    }

                    console.log('Comment created successfully, refreshing comments...');
                }

                resetButton();
            }
        });
    }
}

function setupTextarea() {
    const textarea = document.getElementById('commentContent');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
}

// Comment creator initialization function
export function initCommentCreator(postId, onCommentCreated = null) {
    if (!postId) {
        console.error('Post ID is required for comment creator');
        return;
    }

    console.log('Initializing comment creator for post:', postId);

    initCommentForm(postId, onCommentCreated);
    setupTextarea();

    return {
        createComment: (content) => createComment({ post_id: postId, content }),
        reinitialize: () => initCommentForm(postId, onCommentCreated)
    };
}