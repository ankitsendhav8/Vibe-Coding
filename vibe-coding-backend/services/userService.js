const { getPool } = require('../config/db');

const getAllUsers = async () => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM Users');
  return rows;
};

const getUserById = async (id) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
  return rows[0] || null;
};

const createUser = async ({ name, email }) => {
  const pool = getPool();
  const [result] = await pool.query(
    'INSERT INTO Users (name, email) VALUES (?, ?)',
    [name, email]
  );
  const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [result.insertId]);
  return rows[0];
};

const updateUser = async (id, { name, email }) => {
  const pool = getPool();
  const [result] = await pool.query(
    'UPDATE Users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );
  if (result.affectedRows === 0) return null;
  const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
  return rows[0] || null;
};

const deleteUser = async (id) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
  if (rows.length === 0) return null;
  await pool.query('DELETE FROM Users WHERE id = ?', [id]);
  return rows[0];
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
