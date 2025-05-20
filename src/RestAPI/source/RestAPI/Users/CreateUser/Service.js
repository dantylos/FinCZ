const bcrypt = require('bcrypt');
const { createGenericService } = require('../../utils/serviceUtils.js');

const saltRounds = 10;


const createUserService = (repositoryMethod) => {
    const genericService = createGenericService(repositoryMethod);
// Extends basic service
    return async (userData) => {
        if (!userData.username ||
            !userData.email ||
            !userData.password ||
            !userData.security_question ||
            !userData.security_answer ||
            !userData.agreement_signed_at) {
            throw new Error('All required user fields must be provided');
        }

        // Copying user data, so it will be mutable
        const processedUserData = { ...userData };

        // Password hashing
        processedUserData.password_hash = await bcrypt.hash(userData.password, saltRounds);
        // Security question hashing
        processedUserData.security_answer_hash = await bcrypt.hash(userData.security_answer, saltRounds);

        // Passing modified data to the generic service
        return await genericService(processedUserData);
    };
};

module.exports = { createUserService };


// const { createUser } = require('./Repository.js');
// const { createGenericService } = require('../../utils/serviceUtils.js');
//
// const createUserService = createGenericService(createUser);
//
// module.exports = { createUserService };