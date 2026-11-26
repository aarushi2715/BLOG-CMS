import api from './axiosInstance';

// Public paginated & filtered posts list
export const fetchPosts = (page = 1, category = '') => {
  const params = { page };
  if (category) {
    params.category = category;
  }
  return api.get('/posts', { params });
};

// Public article lookup by slug
export const fetchPostBySlug = (slug) =>
  api.get(`/posts/${encodeURIComponent(slug)}`);

// Admin view of all posts
export const fetchAllPostsAdmin = () =>
  api.get('/posts/admin/all');

// Create a new post
export const createPost = (data) =>
  api.post('/posts', data);

// Update an existing post by ID
export const updatePost = (id, data) =>
  api.put(`/posts/${encodeURIComponent(id)}`, data);

// Delete a post by ID
export const deletePost = (id) =>
  api.delete(`/posts/${encodeURIComponent(id)}`);