
import api from './axiosInstance';

export const fetchPosts = (page = 1, category = '') =>
  api.get(`/posts?page=${page}${category ? `&category=${category}` : ''}`);


//public articles use slug for accessing or searching them 
//editing and deleting the articles are done by id 

export const fetchPostBySlug = (slug) =>
  api.get(`/posts/${slug}`);

export const fetchAllPostsAdmin = () =>
  api.get('/posts/admin/all');

export const createPost = (data) =>
  api.post('/posts', data);

export const updatePost = (id, data) =>
  api.put(`/posts/${id}`, data);

export const deletePost = (id) =>
  api.delete(`/posts/${id}`);
