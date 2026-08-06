import { makeAutoObservable, reaction } from 'mobx';
import Field from '../models/Field';
import adminVendorsData from '../data/adminVendorsData';

const VENDORS_STORAGE_KEY = 'shoppy-spot-admin-vendors';
export const VENDORS_PER_PAGE = 6;

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Vendor accounts are admin-provisioned (see database/schema.sql's note on
// vendor_profiles.is_active) - this store owns the add/edit/suspend/delete flow
// that doesn't exist anywhere on the vendor side itself.
class AdminVendorStore {
  vendors = loadFromStorage(VENDORS_STORAGE_KEY, adminVendorsData);

  currentPage = 1;
  searchQuery = '';
  statusFilterField = new Field({ name: 'statusFilter', label: 'Status', type: 'text', value: '' });

  // Add/Edit Vendor dialog state - null editingVendorId means "adding new"
  isFormOpen = false;
  editingVendorId = null;
  ownerNameField = new Field({ name: 'ownerName', label: 'Owner Name', placeholder: 'Enter owner full name', type: 'text', required: true });
  emailField = new Field({ name: 'email', label: 'Email', placeholder: 'Enter store email address', type: 'email', required: true });
  storeNameField = new Field({ name: 'storeName', label: 'Store Name', placeholder: 'Enter store name', type: 'text', required: true });
  storeDescriptionField = new Field({ name: 'storeDescription', label: 'Store Description', placeholder: 'Describe the store', type: 'text' });
  phoneField = new Field({ name: 'phone', label: 'Phone No', placeholder: 'Enter phone number', type: 'tel', required: true, minLength: 10, maxLength: 10 });
  businessAddressField = new Field({ name: 'businessAddress', label: 'Business Address', placeholder: 'Enter business address', type: 'text', required: true });
  logoUrlField = new Field({ name: 'logoUrl', label: 'Logo URL', placeholder: 'Enter a logo image URL', type: 'url' });

  constructor() {
    makeAutoObservable(this);
    reaction(() => this.statusFilterField.value, () => { this.currentPage = 1; });
  }

  get formFields() {
    return [this.ownerNameField, this.emailField, this.storeNameField, this.phoneField, this.businessAddressField];
  }

  get filteredVendors() {
    let list = [...this.vendors];
    if (this.statusFilterField.value) {
      const wantActive = this.statusFilterField.value === 'active';
      list = list.filter((v) => v.isActive === wantActive);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter((v) =>
        v.storeName.toLowerCase().includes(q) ||
        v.ownerName.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q)
      );
    }
    return list;
  }

  get paginatedVendors() {
    const start = (this.currentPage - 1) * VENDORS_PER_PAGE;
    return this.filteredVendors.slice(start, start + VENDORS_PER_PAGE);
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredVendors.length / VENDORS_PER_PAGE));
  }

  get activeVendorCount() {
    return this.vendors.filter((v) => v.isActive).length;
  }

  getVendorById = (id) => this.vendors.find((v) => v.id === id);

  // Computed on demand from another store's live data rather than cached here,
  // so a vendor's stats never go stale relative to adminProductStore/adminOrderStore.
  getVendorStats = (vendorId, products, orders) => {
    const vendorProducts = products.filter((p) => p.vendorId === vendorId);
    const revenue = orders.reduce((sum, order) => {
      const vendorItems = order.items.filter((item) => item.vendorId === vendorId);
      return sum + vendorItems.reduce((itemSum, item) => itemSum + item.unitPrice * item.quantity, 0);
    }, 0);
    const orderCount = orders.filter((order) => order.items.some((item) => item.vendorId === vendorId)).length;

    return { productCount: vendorProducts.length, orderCount, revenue: Number(revenue.toFixed(2)) };
  }

  persistVendors = () => {
    try {
      localStorage.setItem(VENDORS_STORAGE_KEY, JSON.stringify(this.vendors));
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

  toggleActive = (id) => {
    this.vendors = this.vendors.map((v) => (v.id === id ? { ...v, isActive: !v.isActive } : v));
    this.persistVendors();
  }

  deleteVendor = (id) => {
    this.vendors = this.vendors.filter((v) => v.id !== id);
    this.persistVendors();
  }

  resetForm = () => {
    this.editingVendorId = null;
    [
      this.ownerNameField, this.emailField, this.storeNameField, this.storeDescriptionField,
      this.phoneField, this.businessAddressField, this.logoUrlField,
    ].forEach((field) => field.reset());
  }

  openAddForm = () => {
    this.resetForm();
    this.isFormOpen = true;
  }

  openEditForm = (id) => {
    const vendor = this.vendors.find((v) => v.id === id);
    if (!vendor) {
      return;
    }

    this.editingVendorId = id;
    this.ownerNameField.setValue(vendor.ownerName);
    this.emailField.setValue(vendor.email);
    this.storeNameField.setValue(vendor.storeName);
    this.storeDescriptionField.setValue(vendor.storeDescription ?? '');
    this.phoneField.setValue(vendor.phone);
    this.businessAddressField.setValue(vendor.businessAddress);
    this.logoUrlField.setValue(vendor.logoUrl ?? '');
    this.isFormOpen = true;
  }

  closeForm = () => {
    this.isFormOpen = false;
    this.resetForm();
  }

  saveVendor = () => {
    this.formFields.forEach((field) => field.validate());
    if (this.formFields.some((field) => field.error)) {
      return false;
    }

    const vendorData = {
      ownerName: this.ownerNameField.value.trim(),
      email: this.emailField.value.trim(),
      storeName: this.storeNameField.value.trim(),
      storeDescription: this.storeDescriptionField.value.trim(),
      phone: this.phoneField.value.trim(),
      businessAddress: this.businessAddressField.value.trim(),
      logoUrl: this.logoUrlField.value.trim(),
    };

    if (this.editingVendorId) {
      this.vendors = this.vendors.map((v) => (v.id === this.editingVendorId ? { ...v, ...vendorData } : v));
    } else {
      const newVendor = {
        id: `v-${Date.now()}`,
        isActive: true,
        joinedAt: new Date().toISOString(),
        ...vendorData,
      };
      this.vendors = [newVendor, ...this.vendors];
    }

    this.persistVendors();
    this.isFormOpen = false;
    this.resetForm();
    return true;
  }
}

const adminVendorStore = new AdminVendorStore();

export default adminVendorStore;
