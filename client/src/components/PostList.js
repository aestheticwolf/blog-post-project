import React from 'react';
import { motion } from 'framer-motion';
import PostItem from './PostItem';

function PostList({ posts, onDelete, onEdit }) {
  return (
    <div>
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <PostItem post={post} onDelete={onDelete} onEdit={onEdit} />
        </motion.div>
      ))}
    </div>
  );
}

export default PostList;
