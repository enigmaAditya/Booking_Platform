import axios from 'axios';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  getServices: () => api.get('/services'),
  getService: (id) => api.get(`/services/${id}`),
  createBooking: (data) => api.post('/bookings/create', data),
  getBookingHistory: () => api.get('/bookings/history'),
};

export default api;
