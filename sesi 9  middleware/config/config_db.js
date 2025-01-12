const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createpool({
    host: Process.env.DB_HOST,
    user: Process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
Module.exports = pool.promise();