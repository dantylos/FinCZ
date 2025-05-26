const { Pool } = require('pg');  // Пул для подключения к ДБ

// Debug logging
console.log('Database connection config:', {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    // Don't log the password for security
});

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
    ssl: {rejectUnauthorized: false}
});

// Test the connection
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

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

// Общий метод для фич по обновлению ресурса
const updateResource = async (tableName, id, entity, fields) => {
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const query = `
        UPDATE ${tableName}
        SET ${setClause}
        WHERE id = $1
        RETURNING *;
    `;

    const values = [id, ...fields.map(field => entity[field])];
    return await executeQuerySingle(query, values);
};

module.exports = {
    executeQuery,
    executeQuerySingle,
    createResource,
    deleteResource,
    executeFunctionCall,
    updateResource
};