const { sql, getPool } = require('../config/db');

const getAllUsers = async () => {
  const pool = getPool();
  const result = await pool.request().query('SELECT * FROM Users');
  return result.recordset;
};

const getUserById = async (id) => {
  const pool = getPool();
  const result = await pool
    .request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Users WHERE id = @id');
  return result.recordset[0] || null;
};

const createUser = async ({ name, email }) => {
  const pool = getPool();
  const result = await pool
    .request()
    .input('name', sql.NVarChar, name)
    .input('email', sql.NVarChar, email)
    .query(
      'INSERT INTO Users (name, email) OUTPUT INSERTED.* VALUES (@name, @email)'
    );
  return result.recordset[0];
};

const updateUser = async (id, { name, email }) => {
  const pool = getPool();
  const result = await pool
    .request()
    .input('id', sql.Int, id)
    .input('name', sql.NVarChar, name)
    .input('email', sql.NVarChar, email)
    .query(
      'UPDATE Users SET name = @name, email = @email OUTPUT INSERTED.* WHERE id = @id'
    );
  return result.recordset[0] || null;
};

const deleteUser = async (id) => {
  const pool = getPool();
  const result = await pool
    .request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Users OUTPUT DELETED.* WHERE id = @id');
  return result.recordset[0] || null;
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
