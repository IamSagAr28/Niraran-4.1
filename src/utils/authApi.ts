import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://niraran-4-1.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});

// Suppress console errors for expected 401 responses
api.interceptors.response.use(
  response => response,
  error => {
    // Don't log 401 errors from /api/me - they're expected when not logged in
    if (error.config?.url === '/api/me' && error.response?.status === 401) {
      return Promise.reject(error);
    }
    // Log other errors normally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const checkSession = async () => {
  try {
    const response = await api.get('/api/me');
    return response.data;
  } catch (error: any) {
    // 401 is expected when not logged in, don't log it as an error
    if (error.response?.status !== 401) {
      console.error('Session check error:', error);
    }
    return { authenticated: false };
  }
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signupUser = async (email: string, password: string, firstName?: string, lastName?: string) => {
  const response = await api.post('/auth/signup', { email, password, firstName, lastName });
  return response.data;
};

export const logoutUser = async () => {
  await api.get('/auth/logout');
};

export const updateProfile = async (profileData: any) => {
  const response = await api.put('/api/profile', profileData);
  return response.data;
};

export const googleLoginUrl = `${API_URL}/auth/google`;
