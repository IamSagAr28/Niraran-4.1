import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update this in production

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

export const logoutUser = async () => {
  await api.get('/auth/logout');
};

export const googleLoginUrl = `${API_URL}/auth/google`;
