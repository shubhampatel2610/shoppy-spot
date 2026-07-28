import axiosClient from '../api/axiosClient';

// Fetch all products
export const fetchAllProducts = () => axiosClient.get('/products?limit=0');

// Fetch all categories
export const fetchAllCategories = () => axiosClient.get('/products/categories');

// Search Products by query
export const searchProductsByQuery = (query) => axiosClient.get(`/products/search?q=${encodeURIComponent(query)}`);

// fetch single product details by ID
export const fetchProductDataById = (id) => axiosClient.get(`/products/${id}`);
