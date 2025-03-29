const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // your MySQL password
  database: 'blog_app',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL DB');
});

// Get all posts
app.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts ORDER BY created_at DESC', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Post created' });
  });
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
  db.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Post deleted' });
  });
});

// Update a post
app.put('/posts/:id', (req, res) => {
  const { title, content } = req.body;
  db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Post updated' });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
