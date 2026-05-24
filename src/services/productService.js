const BASE_URL = 'https://dummyjson.com';

// Fetch all products
export const fetchAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products?limit=0`);

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

// Fetch all categories
export const fetchAllCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  return res.json();
}

// Search Products by query
export const searchProductsByQuery = async (query) => {
  const res = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);

  if (!res.ok) {
    throw new Error('Failed to search products');
  }

  return res.json();
}

// fetch single product details by ID
export const fetchProductDataById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}