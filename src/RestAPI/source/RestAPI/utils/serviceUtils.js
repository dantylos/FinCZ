// Общий сервис для фич по добавлению ресурса
const createGenericService = (repositoryMethod) => {
    return async (data) => {
        return await repositoryMethod(data);    // TODO Разобрать какая валидация данных нужна
    };
};

// Общий сервис для фич по удалению ресурса
const deleteGenericService = (repositoryMethod) => {
    return async (id) => {
        return await repositoryMethod(id);
    };
};

module.exports = {
    createGenericService,
    deleteGenericService
};