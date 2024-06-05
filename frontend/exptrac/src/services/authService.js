import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const register = async (userData) => {
  const response = await axios.post('/api/auth/register', userData);
  const { token } = response.data;
  localStorage.setItem('token', token);
  setAuthToken(token);
  return jwt_decode(token);
};

export const login = async (userData) => {
  const response = await axios.post('/api/auth/login', userData);
  const { token } = response.data;
  localStorage.setItem('token', token);
  setAuthToken(token);
  return jwt_decode(token);
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getUserFromToken = (token) => {
  return jwt_decode(token);
};
