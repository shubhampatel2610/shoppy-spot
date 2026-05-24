import { makeAutoObservable, runInAction } from 'mobx';
import { fetchAllCategories, fetchAllProducts } from '../services/productService';

class ProductStore {
  // Listing Page States
  allProducts = [];
  allCategories = [];
  selectedProduct = null;
  loading = false;
  error = null;

  // Filter Panel Constants
  selectedCategories = [];
  selectedBrands = [];
  minPrice = '';
  maxPrice = '';
  searchQuery = '';
  hasActiveFilters = this.selectedCategories.length > 0 ||
    this.selectedBrands.length > 0 ||
    this.minPrice ||
    this.maxPrice;

  // Pagination States
  currentPage = 1

  constructor() {
    makeAutoObservable(this);
  }

  // Filter Panel Actions
  setMinPrice = (value) => {
    this.minPrice = value
  }

  setMaxPrice = (value) => {
    this.maxPrice = value
  }

  resetPage = () => {
    this.currentPage = 1
  }

  clearFilters = () => {
    this.selectedCategories = []
    this.selectedBrands = []
    this.minPrice = ''
    this.maxPrice = ''
    this.searchQuery = ''
    this.currentPage = 1
  }

  get availableBrands() {
    const brands = this.allProducts.map(p => p.brand).filter(Boolean);
    return [...new Set(brands)].sort();
  }

  toggleBrand = (brand) => {
    if (this.selectedBrands.includes(brand)) {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    } else {
      this.selectedBrands = [...this.selectedBrands, brand];
    }
    this.currentPage = 1;
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