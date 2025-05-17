import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Configure axios defaults
axios.defaults.withCredentials = true;

// Set auth token in axios headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    setAuthToken(response.data.token);
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    setAuthToken(response.data.token);
  }

  return response.data;
};

// Logout user
const logout = async () => {
  try {
    await axios.get(API_URL + '/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('user');
    setAuthToken(null);
  }
};

// Get user profile
const getProfile = async () => {
  try {
    // Get token from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      throw new Error('No token found');
    }

    // Set the token in axios headers
    setAuthToken(user.token);

    const response = await axios.get(API_URL + '/me');
    return response.data;
  } catch (error) {
    // If there's an error (like 401), clear the local storage
    localStorage.removeItem('user');
    setAuthToken(null);
    throw error;
  }
};

const authService = {
  register,
  login,
  logout,
  getProfile,
  setAuthToken,
};

export default authService; 