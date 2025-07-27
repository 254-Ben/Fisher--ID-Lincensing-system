import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
}); 
// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
// AUTH API
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
};
// Boat API
export const boatApi = {
  getBoats: () => api.get('/boats'),
  getBoat: (id) => api.get(`/boats/${id}`),
  createBoat: (boatData) => api.post('/boats', boatData),
  updateBoat: (id, boatData) => api.put(`/boats/${id}`, boatData),
  deleteBoat: (id) => api.delete(`/boats/${id}`),
};
// Permit API
export const permitApi = {
  getPermits: () => api.get('/permits'),
  getPermit: (id) => api.get(`/permits/${id}`),
  createPermit: (permitData) => api.post('/permits', permitData),
  updatePermit: (id, permitData) => api.put(`/permits/${id}`, permitData),
  deletePermit: (id) => api.delete(`/permits/${id}`),
};
// Fisher API
export const fisherApi = {
  getFishers: () => api.get('/fishers'),
  getFisher: (id) => api.get(`/fishers/${id}`),
  createFisher: (fisherData) => api.post('/fishers', fisherData),
  updateFisher: (id, fisherData) => api.put(`/fishers/${id}`, fisherData),
  deleteFisher: (id) => api.delete(`/fishers/${id}`),
};  
// User API
export const userApi = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};
export default api;