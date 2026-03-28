const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool (better than a single connection)
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'crud_app',
  waitForConnections: true,
  connectionLimit: 10,
});

// promisify so we can use async/await
module.exports = pool.promise();
