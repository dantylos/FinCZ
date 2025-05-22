const express = require('express');

//Метод для обработки эксепшенов
const exceptionHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        console.error(err);
        res.status(500).json({
            error: err.message || 'An unexpected error occurred'
        });
    });
};

// Общий метод для фич по добавлению ресурса
const createResourceRouter = (path, createService, resourceName = 'resource') => {
    const router = express.Router();

    router.post(path, exceptionHandler(async (req, res) => {
        const resource = await createService(req.body);
        res.status(201).json(resource); // Возвращает ХТМЛ код, что всё топ, если не топ то хендлер его прервёт
    }));

    return router;
};

// Общий метод для фич по удалению ресурса
const deleteResourceRouter = (path, deleteService, resourceName = 'resource') => {
    const router = express.Router();

    router.delete(path + '/:id', exceptionHandler(async (req, res) => {
        const resourceId = req.params.id;
        const result = await deleteService(resourceId);

        if (!result) {
            return res.status(404).json({ error: `${resourceName} not found` });
        }

        res.status(200).json({ message: `${resourceName} deleted successfully` });
    }));

    return router;
};

module.exports = {
    asyncHandler: exceptionHandler,
    createResourceRouter,
    deleteResourceRouter
};