require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/items', async (req, res) => {
  const { name, category, exp, note } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO items (name, category, exp, note) VALUES (?, ?, ?, ?)',
      [name, category, exp, note]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, exp, note } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE items SET name = ?, category = ?, exp = ?, note = ? WHERE id = ?',
      [name, category, new Date(exp), note, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM items WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, function () {
  //開啟listen port在3001，port的概念在網路方面的課程應該會有教到
  //簡單說就是開一個洞，去和其他的application連接

  console.log("Example app listening at http://0.0.0.0:%s", port);

});

module.exports = app;
