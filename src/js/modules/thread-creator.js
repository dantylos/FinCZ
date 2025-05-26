
import { AuthUtils } from './authUtils.js'; // убедись, что путь правильный

// Функция для создания треда
async function createThread(threadData) {
    if (!AuthUtils.isAuthenticated()) {
        alert('Please log in to create a thread');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/threads/create', {
            method: 'POST',
            headers: {
                ...AuthUtils.getAuthHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: threadData.title,
                body: threadData.body,
                category: threadData.category
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.error || 'Failed to create thread');
        } else {
            alert('Thread created successfully!');
            console.log('Created thread:', result);
            // здесь можно обновить UI, например, добавить тред в список
            return result;
        }
    } catch (error) {
        console.error('Error creating thread:', error);
        alert('Request failed. Please try again.');
    }
}

// Инициализация обработчика формы
function initThreadForm() {
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

            await createThread(threadData);
            threadForm.reset(); // очищаем форму после успешной отправки
        });
    }
}

// Экспортируемая функция для main.js
export function initThreadCreator() {
    initThreadForm();
}
