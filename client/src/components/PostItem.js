import React, { useState } from 'react';

function PostItem({ post, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleSave = () => {
    onEdit(post.id, { title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  return (
    <div className="card my-2 post-card">
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              className="form-control mb-2"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
            <button className="btn btn-primary btn-sm me-2" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(post.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default PostItem;
