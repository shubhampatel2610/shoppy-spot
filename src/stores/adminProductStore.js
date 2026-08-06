import { makeAutoObservable, reaction } from 'mobx';
import Field from '../models/Field';
import adminProductsData from '../data/adminProductsData';

const PRODUCTS_STORAGE_KEY = 'shoppy-spot-admin-products';
export const ITEMS_PER_PAGE = 6;

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Cross-vendor product catalog. Admin acts as a moderator here, not an owner - it
// can change status or remove a listing, but doesn't rewrite vendor-owned fields
// like title/price (see VendorProductFormPage for that).
class AdminProductStore {
  products = loadFromStorage(PRODUCTS_STORAGE_KEY, adminProductsData);

  currentPage = 1;
  searchQuery = '';
  statusFilterField = new Field({ name: 'statusFilter', label: 'Status', type: 'text', value: '' });
  vendorFilterField = new Field({ name: 'vendorFilter', label: 'Vendor', type: 'text', value: '' });

  constructor() {
    makeAutoObservable(this);
    reaction(() => [this.statusFilterField.value, this.vendorFilterField.value], () => { this.currentPage = 1; });
  }

  get filteredProducts() {
    let list = [...this.products];
    if (this.statusFilterField.value) {
      list = list.filter((p) => p.status === this.statusFilterField.value);
    }
    if (this.vendorFilterField.value) {
      list = list.filter((p) => p.vendorId === this.vendorFilterField.value);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    return list;
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * ITEMS_PER_PAGE;
    return this.filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredProducts.length / ITEMS_PER_PAGE));
  }

  persistProducts = () => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(this.products));
    } catch {
      // storage unavailable - changes still work in-memory for this session
    }
  }

  setPage = (page) => {
    this.currentPage = page;
  }

  setSearchQuery = (query) => {
    this.searchQuery = query;
    this.currentPage = 1;
  }

  // Moderation-only status toggle - active listings can be pulled down (archived)
  // and reinstated, same "toggleArchive" verb the vendor side uses.
  toggleArchive = (id) => {
    this.products = this.products.map((p) =>
      p.id === id ? { ...p, status: p.status === 'archived' ? 'active' : 'archived' } : p
    );
    this.persistProducts();
  }

  deleteProduct = (id) => {
    this.products = this.products.filter((p) => p.id !== id);
    this.persistProducts();
  }
}

const adminProductStore = new AdminProductStore();

export default adminProductStore;
