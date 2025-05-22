const { executeQuerySingle } = require('../../utils/dbUtils');

const USER_TABLE = 'users';

const findUserByUsername = async (username) => {
    const query = `SELECT * FROM ${USER_TABLE} WHERE username = $1;`;
    return await executeQuerySingle(query, [username]);
};

module.exports = {
    findUserByUsername,
};
