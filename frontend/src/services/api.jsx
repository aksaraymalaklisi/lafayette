import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000"; // Modificação: estamos usando Vite

const api = axios.create({
    baseURL: '/api/',
});

// GET (all)
export const listProdutos = () => {
    return api.get('/produtos/');
};

// GET (id)
export const getProduto = (id) => {
    return api.get(`/produtos/${id}/`);
};

// POST
export const createProduto = (produto) => {
    return api.post('/produtos/', produto);
};

// PUT (update)
export const updateProduto = (id, produto) => {
    return api.put(`/produtos/${id}/`, produto);
};

// DELETE
export const deleteProduto = (id) => {
    return api.delete(`/produtos/${id}/`);
};

export default api;
