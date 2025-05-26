const { executeQuerySingle } = require('../../utils/dbUtils');

const USER_TABLE = 'users';

const findUserByUsername = async (username) => {
    const query = `SELECT * FROM ${USER_TABLE} WHERE username = $1;`;
    return await executeQuerySingle(query, [username]);
};

const isUsernameTaken = async (username) => {
    const query = `SELECT EXISTS(SELECT 1 FROM ${USER_TABLE} WHERE username = $1) as exists;`;
    const result = await executeQuerySingle(query, [username]);
    return result.exists;
};

const isEmailTaken = async (email) => {
    const query = `SELECT EXISTS(SELECT 1 FROM ${USER_TABLE} WHERE email = $1) as exists;`;
    const result = await executeQuerySingle(query, [email]);
    return result.exists;
};

const findUserById = async (userId) => {
    const query = `SELECT * FROM ${USER_TABLE} WHERE id = $1;`;
    return await executeQuerySingle(query, [userId]);
};

module.exports = {
    findUserByUsername,
    isUsernameTaken,
    isEmailTaken,
    findUserById
};
