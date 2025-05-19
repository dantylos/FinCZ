const { Pool } = require('pg');  // Пул для подключения к ДБ
const pool = new Pool({
    user: "client_service",
    host: "localhost",
    database: "postgres",
    password: "jouhl99866",
    port: "5432"
});
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);


// Метод вызова запроса, возвращает массив
const executeQuery = async (query, values) => {
    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw new Error(`Database operation failed: ${error.message}`);
    }
};


// Метод вызова запроса в ДБ, возвращает один объект
const executeQuerySingle = async (query, values) => {
    const rows = await executeQuery(query, values);
    return rows[0] || null;
};

// Общий метод для фич по добавлению ресурса
const createResource = async (tableName, entity, fields) => {
    const fieldNames = fields.join(', ');
    const placeholders = fields.map((_, index) => `$${index + 1}`).join(', ');

    const query = `
        INSERT INTO ${tableName} (
            id, ${fieldNames}
        ) VALUES (
            gen_random_uuid(), ${placeholders}
        ) RETURNING *;
    `;

    const values = fields.map(field => entity[field]);
    return await executeQuerySingle(query, values);
};

// Общий метод для фич по удалению ресурса
const deleteResource = async (tableName, id) => {
    const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *;`;
    return await executeQuerySingle(query, [id]);
};

// Метод для выполнения произвольной функции в базе данных
const executeFunctionCall = async (functionName, values) => {
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    const query = `SELECT ${functionName}(${placeholders});`;
    return await executeQuerySingle(query, values);
};

module.exports = {
    executeQuery,
    executeQuerySingle,
    createResource,
    deleteResource,
    executeFunctionCall
};