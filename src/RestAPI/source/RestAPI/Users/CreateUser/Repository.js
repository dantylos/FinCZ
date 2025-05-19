
const { createResource } = require('../../utils/dbUtils.js');

const createUser = async (user) => {
    const fields = [
        'username', 'legal_names', 'email', 'password_hash',
        'security_question', 'security_answer_hash', 'role',
        'profile_picture', 'agreement_signed_at'
    ];
    return await createResource('users', user, fields);
};

module.exports = { createUser };
