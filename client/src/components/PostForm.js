import React, { useState } from 'react';
import { motion } from 'framer-motion';

function PostForm({ onAddPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await onAddPost({ title, content });
    if (res.success) {
      setMessage('✅ Post added!');
      setTitle('');
      setContent('');
    } else {
      setMessage('❌ Failed to add post.');
    }

    setLoading(false);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4 shadow rounded bg-light mb-4"
    >
      <h4 className="mb-3">📝 Create New Post</h4>
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="form-control mb-3"
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Post'}
      </button>
      {message && <p className="mt-3">{message}</p>}
    </motion.form>
  );
}

export default PostForm;
