import pool from './db.js';

export const getUserByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
  return rows[0];
};
