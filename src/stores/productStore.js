import { makeAutoObservable, runInAction } from 'mobx';
import { fetchAllCategories, fetchAllProducts } from '../services/productService';

class ProductStore {
  // Listing Page States
  allProducts = [];
  allCategories = [];
  selectedProduct = null;
  loading = false
  error = null

  constructor() {
    makeAutoObservable(this);
  }

  // Load all products (used for client-side filtering)
  loadAllProducts = async () => {
    this.loading = true
    this.error = null
    try {
      const data = await fetchAllProducts();
      runInAction(() => {
        this.allProducts = data.products;
        this.loading = false;
      })
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      })
    }
  }

  // Load all categories
  loadAllCategories = async () => {
    try {
      const data = await fetchAllCategories();
      runInAction(() => {
        this.allCategories = Array.isArray(data)
          ? data.map(c => (typeof c === 'string' ? { slug: c, name: c } : c))
          : []
      })
    } catch (err) {
      console.error('Categories load error:', err.message)
    }
  }
}

const productStore = new ProductStore();

export default productStore;