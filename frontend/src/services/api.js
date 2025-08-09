import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  register: (userData) =>
    api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
};

// Fisher API
export const fisherAPI = {
  updateProfile: (data) =>
    api.put('/fisher/profile', data),
  uploadProfileImage: (file) =>
    api.post('/fisher/upload-image', file),
};

// Boat API
export const boatAPI = {
  getBoats: () => api.get('/boats'),
  createBoat: (boatData) =>
    api.post('/boats', boatData),
  updateBoat: (id, boatData) =>
    api.put(`/boats/${id}`, boatData),
  deleteBoat: (id) => api.delete(`/boats/${id}`),
};

// Permit API
export const permitAPI = {
  getPermits: () => api.get('/permits'),
  createPermit: (permitData) =>
    api.post('/permits', permitData),
  updatePermit: (id, permitData) =>
    api.put(`/permits/${id}`, permitData),
  deletePermit: (id) => api.delete(`/permits/${id}`),
};

// Digital ID API
export const digitalIdAPI = {
  getDigitalId: () => api.get('/digital-id'),
  generateDigitalId: () => api.post('/digital-id/generate'),
  renewDigitalId: (id) => api.post(`/digital-id/${id}/renew`),
};

// Admin API
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  getAllBoats: () => api.get('/admin/boats'),
  getAllPermits: () => api.get('/admin/permits'),
  approvePermit: (id) => api.put(`/admin/permits/${id}/approve`),
  rejectPermit: (id, reason) =>
    api.put(`/admin/permits/${id}/reject`, { reason }),
  verifyUser: (id) => api.put(`/admin/users/${id}/verify`),
};