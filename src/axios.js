// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

export default instance;
