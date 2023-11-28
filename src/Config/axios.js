// axiosInstance.js

import axios from 'axios';

import { Buffer } from 'buffer';

const baseURL = 'http://localhost:8080';

const instance = axios.create({
  baseURL: baseURL,
});

export const addBasicAuth = (username, password) => {
  // Adiciona um interceptor para cada requisição
  instance.interceptors.request.use((config) => {
    // Adiciona os cabeçalhos de autenticação à requisição
    config.headers.Authorization = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
    return config;
  });

  // Retorna a instância Axios modificada
  return instance;
};
