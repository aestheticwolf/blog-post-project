import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './BlogApp.css';
import PostForm from './PostForm';
import PostList from './PostList';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

function BlogApp() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/posts');
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error("❌ Failed to fetch posts.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const addPost = async (post) => {
    try {
      const res = await axios.post('http://localhost:5000/posts', post);
      if (res.status === 201 || res.status === 200) {
        fetchPosts();
        toast.success("✅ Post added successfully!");
        return { success: true };
      }
      toast.error("❌ Failed to add post.");
      return { success: false };
    } catch (error) {
      console.error('Error adding post:', error);
      toast.error("❌ Error adding post.");
      return { success: false };
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      fetchPosts();
      toast.error("🗑️ Post deleted.");
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("❌ Error deleting post.");
    }
  };

  const editPost = async (id, updatedPost) => {
    try {
      await axios.put(`http://localhost:5000/posts/${id}`, updatedPost);
      fetchPosts();
      toast.info("✏️ Post updated!");
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error("❌ Error updating post.");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <div className={`container mt-4 blog-app ${darkMode ? 'dark-mode' : ''}`}>
      <nav className={`navbar mb-4 shadow-sm rounded ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container justify-content-between">
          <span className="navbar-brand mb-0 h1">📝 Blog Post Manager</span>
          <button onClick={toggleDarkMode} className="btn btn-outline-secondary btn-sm">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

  

      {loading ? (
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <PostForm onAddPost={addPost} />
          <motion.hr
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
            className="my-4"
          />
          <PostList posts={posts} onDelete={deletePost} onEdit={editPost} />
        </>
      )}

      {/* ✅ Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        pauseOnHover={false}
        draggable={false}
        theme={darkMode ? "dark" : "light"}
        style={{
          borderRadius: '12px',
          fontSize: '15px',
          textAlign: 'center',
          zIndex: 9999, // 👈 Makes sure it's not hidden behind other components
          boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
        }}
      />
    </div>
  );
}

export default BlogApp;
