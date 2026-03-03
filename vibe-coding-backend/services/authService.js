const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/db');

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || 'vibe-coding-secret-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const signup = async ({ name, email, password }) => {
  const pool = getPool();

  const [existing] = await pool.query(
    'SELECT id FROM AppUsers WHERE email = ?', [email]
  );
  if (existing.length > 0) {
    const err = new Error('An account with this email already exists.');
    err.statusCode = 409;
    throw err;
  }

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  const [result] = await pool.query(
    'INSERT INTO AppUsers (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, password_hash]
  );

  const [rows] = await pool.query(
    'SELECT id, name, email, created_at FROM AppUsers WHERE id = ?',
    [result.insertId]
  );
  const user = rows[0];
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return { user, token };
};

const login = async ({ email, password }) => {
  const pool = getPool();

  const [rows] = await pool.query(
    'SELECT * FROM AppUsers WHERE email = ?', [email]
  );
  if (rows.length === 0) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const dbUser = rows[0];
  const isMatch = await bcrypt.compare(password, dbUser.password_hash);
  if (!isMatch) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const user = { id: dbUser.id, name: dbUser.name, email: dbUser.email, created_at: dbUser.created_at };
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return { user, token };
};

const getUserById = async (id) => {
  const pool = getPool();
  const [rows] = await pool.query(
    'SELECT id, name, email, created_at FROM AppUsers WHERE id = ?', [id]
  );
  return rows[0] || null;
};

const getActiveUsers = async () => {
  const pool = getPool();
  const [rows] = await pool.query(
    'SELECT id, name, email, created_at FROM AppUsers ORDER BY created_at DESC'
  );
  return rows;
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { signup, login, getUserById, getActiveUsers, verifyToken };
