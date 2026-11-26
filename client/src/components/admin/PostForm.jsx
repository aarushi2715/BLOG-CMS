import { useState, useEffect } from 'react';

export default function PostForm({ mode = 'create', initialData = null, onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ title, content });
    } else {
      console.log(`PostForm (${mode}) submitted:`, { title, content });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
      <h3>{mode === 'edit' ? 'Edit Post Form (Placeholder)' : 'Create Post Form (Placeholder)'}</h3>

      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        rows="5"
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button type="submit">
        {mode === 'edit' ? 'Update Post' : 'Publish Post'}
      </button>
    </form>
  );
}