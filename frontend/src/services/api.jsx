// src/services/api.js
import axios from 'axios';

// Set up the base URL for your backend API
const api = axios.create({
  baseURL: 'http://localhost:5000/auth', // Change this to match your backend's base URL
});

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Save token to localStorage after login
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
