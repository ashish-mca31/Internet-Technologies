const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET all users — supports search, sort, pagination
router.get('/', async (req, res) => {
  try {
    const { search = '', sortBy = 'name', order = 'asc', page = 1, limit = 5 } = req.query;

    // Whitelist sort columns to prevent SQL injection
    const allowedSort = ['name', 'email', 'age', 'created_at'];
    const sortColumn  = allowedSort.includes(sortBy) ? sortBy : 'name';
    const sortOrder   = order === 'desc' ? 'DESC' : 'ASC';
    const offset      = (Number(page) - 1) * Number(limit);

    // Count total matching rows
    const [countRows] = await db.query(
      'SELECT COUNT(*) AS total FROM users WHERE name LIKE ? OR email LIKE ?',
      [`%${search}%`, `%${search}%`]
    );
    const total = countRows[0].total;

    // Fetch the page of users
    const [users] = await db.query(
      `SELECT * FROM users
       WHERE name LIKE ? OR email LIKE ?
       ORDER BY ${sortColumn} ${sortOrder}
       LIMIT ? OFFSET ?`,
      [`%${search}%`, `%${search}%`, Number(limit), offset]
    );

    res.json({
      users,
      total,
      page:       Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single user by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    const [result] = await db.query(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age || null]
    );

    // Return the newly created user
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT update a user
router.put('/:id', async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, age || null, req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });

    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
