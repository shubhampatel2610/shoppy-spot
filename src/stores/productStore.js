import { makeAutoObservable, runInAction } from 'mobx';
import { fetchAllCategories, fetchAllProducts, fetchProductDataById, searchProductsByQuery } from '../services/productService';

export const ITEMS_PER_PAGE = 8;

class ProductStore {
  // Listing Page States
  allProducts = [];
  allCategories = [];
  loading = false;
  error = null;
  
  // Detail Page States
  selectedProduct = null;
  detailLoading = false;
  detailError = null;

  // Filter Panel Constants
  selectedCategories = [];
  selectedBrands = [];
  minPrice = '';
  maxPrice = '';
  searchQuery = '';

  // Sort Constants
  sortBy = '';

  // Recomputed by applyFilters(); not a computed so price can defer to Apply.
  filteredProducts = [];

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

  // Category/brand callers rerun this immediately; price only via Apply/Clear.
  applyFilters = () => {
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

    this.filteredProducts = this.applySort(list);
  }

  // Sorting is kept separate from filtering so it can be reapplied without refiltering.
  applySort = (list) => {
    switch (this.sortBy) {
      case 'price_asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price_desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'rating_desc':
        return [...list].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...list].sort((a, b) => {
          const aTime = a.meta?.createdAt ? new Date(a.meta.createdAt).getTime() : a.id;
          const bTime = b.meta?.createdAt ? new Date(b.meta.createdAt).getTime() : b.id;
          return bTime - aTime;
        });
      default:
        return list;
    }
  }

  setSortBy = (value) => {
    this.sortBy = value;
    this.currentPage = 1;
    this.applyFilters();
  }

  applyPriceFilter = () => {
    this.applyFilters();
  }

  clearPriceFilter = () => {
    this.minPrice = '';
    this.maxPrice = '';
    this.applyFilters();
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
    this.currentPage = 1
    this.clearPriceFilter()
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
    this.applyFilters()
  }

  toggleBrand = (brand) => {
    if (this.selectedBrands.includes(brand)) {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    } else {
      this.selectedBrands = [...this.selectedBrands, brand];
    }
    this.currentPage = 1;
    this.applyFilters();
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
        this.applyFilters();
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
    this.clearFilters();
    try {
      const data = await searchProductsByQuery(query);
      runInAction(() => {
        this.allProducts = data.products;
        this.loading = false;
        this.applyFilters();
      })
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      })
    }
  }

  // Load single product details by ID
  fetchProductDataById = async (id) => {
    this.detailLoading = true;
    this.detailError = null;
    this.selectedProduct = null;
    try {
      const data = await fetchProductDataById(id);
      runInAction(() => {
        this.selectedProduct = data;
        this.detailLoading = false;
      })
    } catch (err) {
      runInAction(() => {
        this.detailError = err.message;
        this.detailLoading = false;
      })
    }
  }
}

const productStore = new ProductStore();

export default productStore;