import { makeAutoObservable, reaction } from 'mobx';
import Field from '../models/Field';
import adminCustomersData from '../data/adminCustomersData';

const CUSTOMERS_STORAGE_KEY = 'shoppy-spot-admin-customers';
export const CUSTOMERS_PER_PAGE = 6;

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Customer accounts, moderation-only from the admin side - suspend/delete, but
// no editing of a customer's own personal details.
class AdminCustomerStore {
  customers = loadFromStorage(CUSTOMERS_STORAGE_KEY, adminCustomersData);

  currentPage = 1;
  searchQuery = '';
  statusFilterField = new Field({ name: 'statusFilter', label: 'Status', type: 'text', value: '' });

  constructor() {
    makeAutoObservable(this);
    reaction(() => this.statusFilterField.value, () => { this.currentPage = 1; });
  }

  get filteredCustomers() {
    let list = [...this.customers];
    if (this.statusFilterField.value) {
      const wantActive = this.statusFilterField.value === 'active';
      list = list.filter((c) => c.isActive === wantActive);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    }
    return list;
  }

  get paginatedCustomers() {
    const start = (this.currentPage - 1) * CUSTOMERS_PER_PAGE;
    return this.filteredCustomers.slice(start, start + CUSTOMERS_PER_PAGE);
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredCustomers.length / CUSTOMERS_PER_PAGE));
  }

  // Computed on demand from adminOrderStore's live orders, same pattern as
  // adminVendorStore.getVendorStats - keeps the stores decoupled from each other.
  getCustomerStats = (customerId, orders) => {
    const customerOrders = orders.filter((order) => order.customerId === customerId);
    const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0);
    return { orderCount: customerOrders.length, totalSpent: Number(totalSpent.toFixed(2)) };
  }

  persistCustomers = () => {
    try {
      localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(this.customers));
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
    this.customers = this.customers.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c));
    this.persistCustomers();
  }

  deleteCustomer = (id) => {
    this.customers = this.customers.filter((c) => c.id !== id);
    this.persistCustomers();
  }
}

const adminCustomerStore = new AdminCustomerStore();

export default adminCustomerStore;
