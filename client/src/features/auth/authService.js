import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Configure axios
axios.defaults.withCredentials = true;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = async () => {
  try {
    await axios.post(API_URL + '/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
};

// Get user profile
const getProfile = async () => {
  try {
    const response = await axios.get(API_URL + '/me');
    return response.data;
  } catch (error) {
    // If there's an error (like 401), clear the local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    throw error;
  }
};

const authService = {
  register,
  login,
  logout,
  getProfile,
};

export default authService; 