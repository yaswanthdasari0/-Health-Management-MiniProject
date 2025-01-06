// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2898/api',
});

export const loginUser = async (data) => api.post('/users/login', data);
export const signupUser = async (data) => api.post('/users/signup', data);
export const createHealthCheck = async (data) => api.post('/healthchecks', data);
