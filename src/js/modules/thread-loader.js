import { qs } from '../utils/dom-utils.js';

// API URL для получения тредов
const API_BASE_URL = 'https://financecz.onrender.com/api/threads';

// Функция для загрузки тредов с сервера
const fetchThreads = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching threads:', error);
        return [];
    }
};

// Функция для создания HTML элемента треда
const createThreadElement = (thread) => {
    const li = document.createElement('li');
    li.className = 'thread-item';

    // Формируем HTML для последнего поста
    let lastPostHtml = '';
    if (thread.last_post && thread.last_post.preview) {
        lastPostHtml = `
            <p class="thread-item__lastpost-title">Last post is: ${escapeHtml(thread.last_post.preview)}</p>
            <p class="thread-item__lastpost-date">${thread.last_post.formatted_date || 'recently'}</p>
        `;
    }

    li.innerHTML = `
        <a href="src/pages/thread-page.html?id=${thread.id}"></a>
        <div class="thread-item__info">
            <div class="thread-item__main">
                <p class="thread-item__name">${escapeHtml(thread.title)}</p>
                <p class="thread-item__creator">${escapeHtml(thread.author.username)}</p>
            </div>
            <div class="thread-item__created">
                <p class="thread-item__created-label">was made</p>
                <p class="thread-item__created-date">${thread.formatted_date}</p>
            </div>
        </div>
        <div class="thread-item__lastpost">
            ${lastPostHtml}
        </div>
    `;

    li.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `src/pages/thread-page.html?id=${thread.id}`;
    });

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

const renderThreads = async () => {
    console.log('renderThreads called'); // Для отладки
    const threadList = qs('#threadList');
    if (!threadList) {
        console.log('threadList element not found');
        return;
    }

    threadList.innerHTML = '';

    threadList.innerHTML = '<li class="loading">Loading threads...</li>';

    try {
        const threads = await fetchThreads();

        threadList.innerHTML = '';

        if (threads.length === 0) {
            threadList.innerHTML = '<li class="no-threads">No threads found</li>';
            return;
        }

        threads.forEach(thread => {
            const threadElement = createThreadElement(thread);
            threadList.appendChild(threadElement);
        });
    } catch (error) {
        console.error('Error rendering threads:', error);
        threadList.innerHTML = '<li class="error">Error loading threads</li>';
    }
};

const refreshThreads = () => {
    renderThreads();
};

export const initThreadLoader = () => {
    // Загружаем треды при инициализации
    renderThreads();
    
    return {
        refreshThreads,
        renderThreads
    };
};