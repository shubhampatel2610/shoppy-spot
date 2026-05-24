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