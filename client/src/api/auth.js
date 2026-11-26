
import api from './axiosInstance';

// Login user
export const loginUser = (email, password) =>
    api.post('/auth/login', { email, password });

// Test authentication middleware
export const testAuth = () =>
    api.get('/auth/test');
