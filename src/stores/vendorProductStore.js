import { makeAutoObservable, reaction } from 'mobx';
import Field from '../models/Field';
import vendorProductsData, { VENDOR_ID } from '../data/vendorProductsData';
import categoriesData from '../data/categoriesData';

const PRODUCTS_STORAGE_KEY = 'shoppy-spot-vendor-products';
const CATEGORIES_STORAGE_KEY = 'shoppy-spot-vendor-categories';
export const ITEMS_PER_PAGE = 6;
export const LOW_STOCK_THRESHOLD = 10;
const PLACEHOLDER_IMAGE = 'https://placehold.co/400x400/1e3a5f/white?text=Product';

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const slugify = (name) => name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

class VendorProductStore {
  // Persisted so add/edit/delete survive a reload, mirroring authStore's persist() pattern.
  products = loadFromStorage(PRODUCTS_STORAGE_KEY, vendorProductsData);
  categories = loadFromStorage(CATEGORIES_STORAGE_KEY, categoriesData);

  // Product List page state
  currentPage = 1;
  searchQuery = '';
  statusFilterField = new Field({ name: 'statusFilter', label: 'Status', type: 'text', value: '' });

  // Add/Edit Product form state - null editingProductId means "adding new"
  editingProductId = null;
  titleField = new Field({ name: 'title', label: 'Title', placeholder: 'Enter product title', type: 'text', required: true });
  descriptionField = new Field({ name: 'description', label: 'Description', placeholder: 'Enter product description', type: 'text', required: true });
  categoryField = new Field({ name: 'category', label: 'Category', placeholder: 'Select or type a category', type: 'text', required: true });
  brandField = new Field({ name: 'brand', label: 'Brand', placeholder: 'Enter brand name', type: 'text' });
  skuField = new Field({ name: 'sku', label: 'SKU', placeholder: 'Enter SKU', type: 'text' });
  priceField = new Field({ name: 'price', label: 'Price', placeholder: 'Enter price', type: 'text', required: true });
  discountField = new Field({ name: 'discountPercentage', label: 'Discount %', placeholder: 'Enter discount percentage', type: 'text' });
  stockField = new Field({ name: 'stock', label: 'Stock Quantity', placeholder: 'Enter stock quantity', type: 'text', required: true });
  imagesField = new Field({ name: 'images', label: 'Image URLs', placeholder: 'Comma-separated image URLs', type: 'text' });
  statusField = new Field({ name: 'status', label: 'Status', placeholder: 'Select status', type: 'text', value: 'draft' });

  constructor() {
    makeAutoObservable(this);
    reaction(() => this.statusFilterField.value, () => { this.currentPage = 1; });
  }

  get productFields() {
    return [this.titleField, this.descriptionField, this.categoryField, this.priceField, this.stockField];
  }

  get categoryOptions() {
    return this.categories.map((c) => c.name);
  }

  get filteredProducts() {
    let list = [...this.products];
    if (this.statusFilterField.value) {
      list = list.filter((p) => p.status === this.statusFilterField.value);
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

  get lowStockProducts() {
    return this.products.filter((p) => p.status === 'active' && p.stock < LOW_STOCK_THRESHOLD);
  }

  persistProducts = () => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(this.products));
    } catch {
      // storage unavailable - changes still work in-memory for this session
    }
  }

  persistCategories = () => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(this.categories));
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

  updateStock = (id, stock) => {
    const qty = Math.max(0, parseInt(stock, 10) || 0);
    this.products = this.products.map((p) => (p.id === id ? { ...p, stock: qty } : p));
    this.persistProducts();
  }

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

  resetForm = () => {
    this.editingProductId = null;
    [
      this.titleField, this.descriptionField, this.categoryField, this.brandField,
      this.skuField, this.priceField, this.discountField, this.stockField, this.imagesField,
    ].forEach((field) => field.reset());
    this.statusField.setValue('draft');
  }

  // Prefills the form fields from an existing product, for the edit flow.
  loadProductIntoForm = (id) => {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      return false;
    }

    this.editingProductId = id;
    this.titleField.setValue(product.title);
    this.descriptionField.setValue(product.description ?? '');
    const category = this.categories.find((c) => c.slug === product.category);
    this.categoryField.setValue(category ? category.name : product.category);
    this.brandField.setValue(product.brand ?? '');
    this.skuField.setValue(product.sku ?? '');
    this.priceField.setValue(String(product.price));
    this.discountField.setValue(String(product.discountPercentage ?? 0));
    this.stockField.setValue(String(product.stock));
    this.imagesField.setValue((product.images ?? []).join(', '));
    this.statusField.setValue(product.status);
    return true;
  }

  // Resolves a typed category name to its slug, creating the category if it doesn't exist yet.
  resolveCategorySlug = (name) => {
    const trimmed = name.trim();
    const existing = this.categories.find((c) => c.name.toLowerCase() === trimmed.toLowerCase());
    if (existing) {
      return existing.slug;
    }

    const slug = slugify(trimmed);
    this.categories = [...this.categories, { id: `cat-${slug}`, name: trimmed, slug }];
    this.persistCategories();
    return slug;
  }

  saveProduct = () => {
    this.productFields.forEach((field) => field.validate());

    const price = parseFloat(this.priceField.value);
    if (isNaN(price) || price < 0) {
      this.priceField.error = 'Enter a valid price';
    }

    const stock = parseInt(this.stockField.value, 10);
    if (isNaN(stock) || stock < 0) {
      this.stockField.error = 'Enter a valid stock quantity';
    }

    if (this.productFields.some((field) => field.error)) {
      return false;
    }

    const categorySlug = this.resolveCategorySlug(this.categoryField.value);
    const discount = parseFloat(this.discountField.value) || 0;
    const images = this.imagesField.value.split(',').map((s) => s.trim()).filter(Boolean);

    const productData = {
      vendorId: VENDOR_ID,
      title: this.titleField.value.trim(),
      description: this.descriptionField.value.trim(),
      category: categorySlug,
      brand: this.brandField.value.trim(),
      sku: this.skuField.value.trim(),
      price,
      discountPercentage: discount,
      stock,
      images: images.length ? images : [PLACEHOLDER_IMAGE],
      status: this.statusField.value || 'draft',
    };

    if (this.editingProductId) {
      this.products = this.products.map((p) =>
        p.id === this.editingProductId ? { ...p, ...productData } : p
      );
    } else {
      const newProduct = {
        id: `vp-${Date.now()}`,
        createdAt: new Date().toISOString(),
        rating: 0,
        ...productData,
      };
      this.products = [newProduct, ...this.products];
    }

    this.persistProducts();
    this.resetForm();
    return true;
  }
}

const vendorProductStore = new VendorProductStore();

export default vendorProductStore;
