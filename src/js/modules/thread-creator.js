import { AuthUtils } from './authUtils.js';

// API URL for thread creation
const API_BASE_URL = 'https://financecz.onrender.com/api/threads';

async function createThread(threadData) {
    if (!AuthUtils.isAuthenticated()) {
        alert('Please log in to create a thread');
        return null;
    }

    if (!threadData.title || !threadData.title.trim()) {
        alert('Thread title is required');
        return null;
    }

    if (!threadData.body || !threadData.body.trim()) {
        alert('Thread description is required');
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/create`, {
            method: 'POST',
            headers: {
                ...AuthUtils.getAuthHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: threadData.title.trim(),
                body: threadData.body.trim(),
                category: threadData.category || 'general'
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.error || 'Failed to create thread');
            return null;
        } else {
            console.log('Created thread:', result);
            return result;
        }
    } catch (error) {
        console.error('Error creating thread:', error);
        alert('Request failed. Please try again.');
        return null;
    }
}

function initThreadForm(onThreadCreated = null) {
    const threadForm = document.getElementById('createThreadForm');
    if (threadForm) {
        threadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const threadData = {
                title: formData.get('title'),
                body: formData.get('body'),
                category: formData.get('category')
            };

            const submitButton = threadForm.querySelector('button[type="submit"]');

            // Blocking the submit button while the request is being processed to prevent double submissions
            if (submitButton) {
                submitButton.disabled = true;
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Creating...';

                const resetButton = () => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                };

                const result = await createThread(threadData);

                if (result) {
                    // Clear the form after successful creation
                    threadForm.reset();

                    if (onThreadCreated && typeof onThreadCreated === 'function') {
                        onThreadCreated(result);
                    } else {
                        // Update the page to show the newly created thread
                        alert('Thread created successfully!');
                        window.location.href = ``;
                    }
                }

                resetButton();
            }
        });
    }
}

function setupTextareas() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

export function initThreadCreator(onThreadCreated = null) {
    console.log('Initializing thread creator');

    initThreadForm(onThreadCreated);
    setupTextareas();

    return {
        createThread: (threadData) => createThread(threadData),
        reinitialize: () => initThreadForm(onThreadCreated)
    };
}