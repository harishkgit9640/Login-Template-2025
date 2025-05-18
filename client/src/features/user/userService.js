import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
// const UPDATE_URL = 'http://localhost:5000/api/users';
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

// get users
const getUsers = async (userData) => {
    const response = await axios.get(API_URL + '/api/users', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setAuthToken(response.data.token);
    }
    return response.data;
};

// create user
const createUser = async (userData) => {
    const response = await axios.post(API_URL + '/auth/register', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setAuthToken(response.data.token);
    }
    return response.data;
};

// handleRoleChange

// delete user
const deleteUser = async (userData) => {
    const response = await axios.post(API_URL + '/users/delete', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setAuthToken(response.data.token);
    }
    return response.data;
};

export default {
    createUser,
    deleteUser,
    getUsers,
    setAuthToken
};

