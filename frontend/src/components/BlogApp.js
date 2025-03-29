// src/components/BlogApp.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Card } from 'react-bootstrap';
import './BlogApp.css';

function BlogApp() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/posts/${editId}`, { title, content });
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/posts', { title, content });
    }
    setTitle('');
    setContent('');
    fetchPosts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post.id);
  };

  return (
    <div className="container mt-4 blog-app">
      <h2 className="mb-4 text-center">Blog Post Manager</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" type="submit">{editId ? 'Update' : 'Post'}</Button>
      </Form>

      <div className="mt-4">
        {posts.map(post => (
          <Card key={post.id} className="mb-3 fade-in">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
              <Button variant="warning" size="sm" onClick={() => handleEdit(post)}>Edit</Button>{' '}
              <Button variant="danger" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BlogApp;
