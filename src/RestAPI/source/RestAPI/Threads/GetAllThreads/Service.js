const { getAllThreads } = require('./Repository');

// Сервис для получения всех тредов
const getAllThreadsService = async () => {
    const threads = await getAllThreads();

    // Форматируем данные для фронтенда
    return threads.map(thread => ({
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
        // Информация о последнем посте
        last_post: {
            content: thread.last_post_content,
            // Создаем краткое описание из контента для отображения
            preview: thread.last_post_content ? createPreview(thread.last_post_content) : null,
            date: thread.last_post_date,
            formatted_date: thread.last_post_date ? formatDate(thread.last_post_date) : null
        },
        // Форматированная дата для отображения
        formatted_date: formatDate(thread.created_at)
    }));
};

// Функция для создания краткого превью контента поста
const createPreview = (content, maxLength = 50) => {
    if (!content) return '';

    // Убираем лишние пробелы и переносы строк
    const cleanContent = content.replace(/\s+/g, ' ').trim();

    if (cleanContent.length <= maxLength) {
        return cleanContent;
    }

    // Обрезаем по словам, а не по символам
    const words = cleanContent.slice(0, maxLength).split(' ');
    words.pop(); // Удаляем последнее (возможно обрезанное) слово
    return words.join(' ') + '...';
};

// Вспомогательная функция для форматирования даты
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
    getAllThreadsService
};