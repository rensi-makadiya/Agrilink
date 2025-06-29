// src/api.js
import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:5001/api', // ✅ includes /api
});
