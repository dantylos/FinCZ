// Generic service for creating any resource
const createGenericService = (repositoryMethod) => {
    return async (data) => {
        return await repositoryMethod(data);
    };
};

// Generic service for deleting any resource
const deleteGenericService = (repositoryMethod) => {
    return async (id) => {
        return await repositoryMethod(id);
    };
};

module.exports = {
    createGenericService,
    deleteGenericService
};