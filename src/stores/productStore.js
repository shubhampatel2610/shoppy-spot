import { makeAutoObservable, runInAction } from 'mobx';
import { fetchAllCategories, fetchAllProducts, searchProductsByQuery } from '../services/productService';

const ITEMS_PER_PAGE = 8;

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

  get hasActiveFilters() {
    return this.selectedCategories.length > 0 ||
      this.selectedBrands.length > 0 ||
      this.minPrice ||
      this.maxPrice;
  }

  // Pagination States
  currentPage = 1;

  constructor() {
    makeAutoObservable(this);
  }

  get filteredProducts() {
    let list = [...this.allProducts];

    if (this.selectedCategories.length > 0) {
      list = list.filter(p => this.selectedCategories.includes(p.category));
    }

    if (this.selectedBrands.length > 0) {
      list = list.filter(p => this.selectedBrands.includes(p.brand));
    }

    const min = parseFloat(this.minPrice);
    if (!isNaN(min)) {
      list = list.filter(p => p.price >= min);
    }

    const max = parseFloat(this.maxPrice);
    if (!isNaN(max)) {
      list = list.filter(p => p.price <= max);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();

      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      )
    }

    return list;
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * ITEMS_PER_PAGE;
    return this.filteredProducts.slice(start, start + ITEMS_PER_PAGE);
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

  setSearchQuery = (query) => {
    this.searchQuery = query
    this.currentPage = 1
  }

  toggleCategory = (slug) => {
    if (this.selectedCategories.includes(slug)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== slug)
    } else {
      this.selectedCategories = [...this.selectedCategories, slug]
    }
    this.currentPage = 1
  }

  toggleBrand = (brand) => {
    if (this.selectedBrands.includes(brand)) {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    } else {
      this.selectedBrands = [...this.selectedBrands, brand];
    }
    this.currentPage = 1;
  }

  setSearchQuery = (query) => {
    this.searchQuery = query;
    this.currentPage = 1;
  }

  // Pagination Actions
  setPage = (page) => {
    this.currentPage = page
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / ITEMS_PER_PAGE)
  }

  // Load all products (used for client-side filtering)
  loadAllProducts = async () => {
    this.loading = true;
    this.error = null;
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

  // Search products by query (server-side search)
  searchProductsByQuery = async (query) => {
    this.loading = true;
    this.error = null;
    try {
      const data = await searchProductsByQuery(query);
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
}

const productStore = new ProductStore();

export default productStore;