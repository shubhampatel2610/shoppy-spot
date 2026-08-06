import { makeAutoObservable } from 'mobx';
import Field from '../models/Field';
import categoriesData from '../data/categoriesData';

// Intentionally the SAME storage key vendorProductStore.js uses for its category
// list - categories are one canonical, platform-wide taxonomy. A rename/delete
// here is immediately visible in the vendor product form's category dropdown,
// and a category a vendor creates from that form shows up here too.
const CATEGORIES_STORAGE_KEY = 'shoppy-spot-vendor-categories';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : categoriesData;
  } catch {
    return categoriesData;
  }
}

const slugify = (name) => name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

class AdminCategoryStore {
  categories = loadFromStorage();

  isFormOpen = false;
  editingCategoryId = null;
  nameField = new Field({ name: 'name', label: 'Category Name', placeholder: 'Enter category name', type: 'text', required: true });

  constructor() {
    makeAutoObservable(this);
  }

  persistCategories = () => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(this.categories));
    } catch {
      // storage unavailable - changes still work in-memory for this session
    }
  }

  resetForm = () => {
    this.editingCategoryId = null;
    this.nameField.reset();
  }

  openAddForm = () => {
    this.resetForm();
    this.isFormOpen = true;
  }

  openEditForm = (id) => {
    const category = this.categories.find((c) => c.id === id);
    if (!category) {
      return;
    }
    this.editingCategoryId = id;
    this.nameField.setValue(category.name);
    this.isFormOpen = true;
  }

  closeForm = () => {
    this.isFormOpen = false;
    this.resetForm();
  }

  // Returns { success, error } instead of throwing so the page can show the error
  // inline the same way form fields do.
  saveCategory = () => {
    this.nameField.validate();
    if (this.nameField.error) {
      return { success: false };
    }

    const name = this.nameField.value.trim();
    const duplicate = this.categories.find(
      (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== this.editingCategoryId
    );
    if (duplicate) {
      this.nameField.error = 'A category with this name already exists';
      return { success: false };
    }

    if (this.editingCategoryId) {
      this.categories = this.categories.map((c) =>
        c.id === this.editingCategoryId ? { ...c, name, slug: slugify(name) } : c
      );
    } else {
      const slug = slugify(name);
      this.categories = [...this.categories, { id: `cat-${slug}`, name, slug }];
    }

    this.persistCategories();
    this.isFormOpen = false;
    this.resetForm();
    return { success: true };
  }

  // productCount is passed in from adminProductStore.products rather than looked
  // up here, keeping the two stores decoupled (same pattern as getVendorStats).
  deleteCategory = (id, productCount) => {
    if (productCount > 0) {
      return { success: false, error: `${productCount} product(s) still use this category. Reassign them first.` };
    }
    this.categories = this.categories.filter((c) => c.id !== id);
    this.persistCategories();
    return { success: true };
  }
}

const adminCategoryStore = new AdminCategoryStore();

export default adminCategoryStore;
