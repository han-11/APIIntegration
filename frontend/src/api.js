// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Ensure this is the correct base URL
  withCredentials: false, // This is optional, depending on your needs
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});


export default apiClient;