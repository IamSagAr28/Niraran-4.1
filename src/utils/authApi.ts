import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://niraran-4-1.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});

export const checkSession = async () => {
  try {
    const response = await api.get('/api/me');
    return response.data;
  } catch (error) {
    return { authenticated: false };
  }
};

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signupUser = async (email, password, firstName, lastName) => {
  const response = await api.post('/auth/signup', { email, password, firstName, lastName });
  return response.data;
};

export const logoutUser = async () => {
  await api.get('/auth/logout');
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/api/profile', profileData);
  return response.data;
};

export const googleLoginUrl = `${API_URL}/auth/google`;
