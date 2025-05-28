import { AuthUtils } from './authUtils.js';

// API URL for post creation
const API_BASE_URL = 'https://financecz.onrender.com/api/posts';

// Post creation function
async function createPost(postData) {
    if (!AuthUtils.isAuthenticated()) {
        alert('Please log in to create a post');
        return false;
    }

    if (!postData.thread_id) {
        alert('Thread ID is required');
        return false;
    }

    if (!postData.content || !postData.content.trim()) {
        alert('Post content is required');
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
                thread_id: postData.thread_id,
                content: postData.content.trim()
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.error || 'Failed to create post');
            return false;
        } else {
            console.log('Created post:', result);
            return result;
        }
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Request failed. Please try again.');
        return false;
    }
}

// Post creation form initialization function
function initPostForm(threadId, onPostCreated = null) {
    const postForm = document.getElementById('createPostForm');
    const postCreatorSection = document.getElementById('post-creator-section') ||
        document.querySelector('.post-creator');

    // Form is hidden if user is not logged in
    if (!AuthUtils.isAuthenticated()) {
        if (postCreatorSection) {
            postCreatorSection.style.display = 'none';
        }
        return;
    }

    if (postForm) {
        postForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const content = formData.get('content');

            const submitButton = postForm.querySelector('button[type="submit"]') ||
                document.getElementById('postPostBtn');

            // Blocking the submit button while the request is being processed to prevent double submissions
            if (submitButton) {
                submitButton.disabled = true;
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Posting...';

                const resetButton = () => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                };

                const postData = {
                    thread_id: threadId,
                    content: content
                };

                const result = await createPost(postData);

                if (result) {
                    postForm.reset();

                    if (onPostCreated && typeof onPostCreated === 'function') {
                        onPostCreated(result);
                    }

                    console.log('Post created successfully, refreshing posts...');
                }

                resetButton();
            }
        });
    }
}

function setupTextarea() {
    const textarea = document.getElementById('content');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
}

// Post creator initialization function
export function initPostCreator(threadId, onPostCreated = null) {
    if (!threadId) {
        console.error('Thread ID is required for post creator');
        return;
    }

    console.log('Initializing post creator for thread:', threadId);

    initPostForm(threadId, onPostCreated);
    setupTextarea();

    return {
        createPost: (content) => createPost({ thread_id: threadId, content }),
        reinitialize: () => initPostForm(threadId, onPostCreated)
    };
}