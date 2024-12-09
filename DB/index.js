//DB/index.js
import { createPool } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = createPool({
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE_NAME,
});

const connect = async () => {
    try {
        const connection = await pool.promise().getConnection();
        console.log('Connected to MySQL');
        connection.release(); // Release the connection back to the pool
    } catch (error) {
        console.error('MySQL connection error:', error.message);
        throw error;
    }
};

export {connect, pool};