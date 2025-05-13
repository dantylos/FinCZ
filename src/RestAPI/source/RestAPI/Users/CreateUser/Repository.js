// const { Pool } = require('pg');
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// });
//
// const createUser = async (user) => {
//     const query = `
//         INSERT INTO users (
//             id, username, legal_names, email, password_hash,
//             security_question, security_answer_hash,
//             role, profile_picture, agreement_signed_at
//         ) VALUES (
//                      gen_random_uuid(), $1, $2, $3, $4,   -- Параметизация запроса
//                      $5, $6, $7,
//                      $8, $9
//                  ) RETURNING *;
//     `;
//     const values = [
//         user.username,
//         user.legal_names,
//         user.email,
//         user.password_hash,
//         user.security_question,
//         user.security_answer_hash,
//         user.role,
//         user.profile_picture,
//         user.agreement_signed_at
//     ];
//     const result = await pool.query(query, values);
//     return result.rows[0];
// };
//
// module.exports = { createUser };


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
