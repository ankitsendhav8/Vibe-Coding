const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host:     process.env.DB_SERVER   || 'localhost',
  port:     parseInt(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
};

let pool = null;

const connectDB = async () => {
  try {
    if (pool) return pool;
    pool = mysql.createPool(dbConfig);
    // Verify the connection is actually reachable
    const conn = await pool.getConnection();
    conn.release();
    console.log('✅ MySQL Database connected successfully');
    return pool;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

const getPool = () => {
  if (!pool) throw new Error('Database not connected. Call connectDB() first.');
  return pool;
};

const closeDB = async () => {
  try {
    if (pool) {
      await pool.end();
      pool = null;
      console.log('🔌 Database connection closed');
    }
  } catch (error) {
    console.error('Error closing database connection:', error.message);
  }
};

module.exports = { connectDB, getPool, closeDB };
