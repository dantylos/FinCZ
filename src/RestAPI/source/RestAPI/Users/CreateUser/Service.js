// const bcrypt = require('bcrypt');
// const { createUser } = require('./Repository.js');
// const { createGenericService } = require('../../utils/serviceUtils.js');
//
// const createUserService = (repositoryMethod) => {
//     // Extends basic service
//     const genericService = createGenericService(repositoryMethod);
//
//     // Returning a new function to extend logic
//     return async (userData) => {
//         // Data validation
//         if (!userData.username ||
//             !userData.email ||
//             !userData.password ||
//             !userData.security_question_hash ||
//             !userData.security_answer ||
//             !userData.agreement_signed_at_hash) {
//             throw new Error('All required user fields must be provided');
//         }
//
//         // Copying user data, so it will be mutable
//         const processedUserData = { ...userData };
//
//         // Password hashing
//         const saltRounds = 10;
//         processedUserData.password = await bcrypt.hash(userData.password, saltRounds);
//
//         // Security question hashing
//         processedUserData.security_answer = await bcrypt.hash(userData.security_answer, saltRounds);
//
//         // Passing modified data to the generic service
//         return await genericService(processedUserData);
//     };
// };
//
// module.exports = { createUserService };


const { createUser } = require('./Repository.js');
const { createGenericService } = require('../../utils/serviceUtils.js');

const createUserService = createGenericService(createUser);

module.exports = { createUserService };