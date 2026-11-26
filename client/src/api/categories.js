import api from './axiosInstance';

export const getAllCategories = () => api.get('/categories');
export const getOneCategory = (name) => api.get(`/categories/${encodeURIComponent(name)}`);
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);