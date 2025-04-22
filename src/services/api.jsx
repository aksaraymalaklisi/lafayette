import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000"; // Modificação: estamos usando Vite

const api = axios.create({
    baseURL: '/api/',
});

export default api;
