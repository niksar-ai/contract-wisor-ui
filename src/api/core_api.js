import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Create a shared axios instance for all API calls.
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the JWT (saved at login) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && token !== 'your-token') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, drop the stale token and send the user back to the login page.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// GET request
export const getData = async (endpoint, params) => {
  try {
    const response = await api.get(endpoint, { "params": params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, JSON.stringify(data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT request
export const putData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE request
export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
