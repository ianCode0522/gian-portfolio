import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/me');
  return response.data;
};

// Public APIs
export const getUpdates = async () => {
  const response = await api.get('/updates');
  return response.data;
};

export const getSkills = async () => {
  const response = await api.get('/skills');
  return response.data;
};

export const getCertificates = async () => {
  const response = await api.get('/certificates');
  return response.data;
};

export const getImages = async () => {
  const response = await api.get('/images');
  return response.data;
};

// Admin - Updates APIs
export const getAdminUpdates = async () => {
  const response = await api.get('/admin/updates');
  return response.data;
};

export const createUpdate = async (data: any) => {
  const response = await api.post('/updates', data);
  return response.data;
};

export const updateUpdate = async (id: number, data: any) => {
  const response = await api.put(`/updates/${id}`, data);
  return response.data;
};

export const deleteUpdate = async (id: number) => {
  const response = await api.delete(`/updates/${id}`);
  return response.data;
};

// Admin - Certificates APIs
export const getAdminCertificates = async () => {
  const response = await api.get('/admin/certificates');
  return response.data;
};

export const createCertificate = async (data: FormData) => {
  const response = await api.post('/certificates', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateCertificate = async (id: number, data: FormData) => {
  const response = await api.post(`/certificates/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-HTTP-Method-Override': 'PUT',
    },
  });
  return response.data;
};

export const deleteCertificate = async (id: number) => {
  const response = await api.delete(`/certificates/${id}`);
  return response.data;
};

// Admin - Images APIs
export const createImage = async (data: any) => {
  const response = await api.post('/images', data);
  return response.data;
};

export const deleteImage = async (id: number) => {
  const response = await api.delete(`/images/${id}`);
  return response.data;
};

export default api;