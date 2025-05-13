// const { createUser } = require('./Repository');
//
// const createUserService = async (data) => {
//     return await createUser(data);
// };
//
// module.exports = { createUserService };

const { createUser } = require('./Repository.js');
const { createGenericService } = require('../../utils/serviceUtils.js');

const createUserService = createGenericService(createUser);

module.exports = { createUserService };