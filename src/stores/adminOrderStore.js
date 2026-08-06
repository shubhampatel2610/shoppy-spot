import { makeAutoObservable, reaction } from 'mobx';
import Field from '../models/Field';
import adminOrdersData from '../data/adminOrdersData';

const ORDERS_STORAGE_KEY = 'shoppy-spot-admin-orders';
export const ORDERS_PER_PAGE = 6;

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Cross-vendor orders, with the order-level payment_status/order_status fields
// (database/schema.sql) the vendor side never surfaces - see vendorOrderStore.js,
// which only ever advances per-item status.
class AdminOrderStore {
  orders = loadFromStorage(ORDERS_STORAGE_KEY, adminOrdersData);

  currentPage = 1;
  statusFilterField = new Field({ name: 'statusFilter', label: 'Order Status', type: 'text', value: '' });
  paymentFilterField = new Field({ name: 'paymentFilter', label: 'Payment Status', type: 'text', value: '' });
  vendorFilterField = new Field({ name: 'vendorFilter', label: 'Vendor', type: 'text', value: '' });

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => [this.statusFilterField.value, this.paymentFilterField.value, this.vendorFilterField.value],
      () => { this.currentPage = 1; }
    );
  }

  get filteredOrders() {
    let list = [...this.orders];
    if (this.statusFilterField.value) {
      list = list.filter((order) => order.orderStatus === this.statusFilterField.value);
    }
    if (this.paymentFilterField.value) {
      list = list.filter((order) => order.paymentStatus === this.paymentFilterField.value);
    }
    if (this.vendorFilterField.value) {
      list = list.filter((order) => order.items.some((item) => item.vendorId === this.vendorFilterField.value));
    }
    return list;
  }

  get paginatedOrders() {
    const start = (this.currentPage - 1) * ORDERS_PER_PAGE;
    return this.filteredOrders.slice(start, start + ORDERS_PER_PAGE);
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredOrders.length / ORDERS_PER_PAGE));
  }

  getOrderById = (id) => this.orders.find((order) => order.id === id);

  persistOrders = () => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(this.orders));
    } catch {
      // storage unavailable - changes still work in-memory for this session
    }
  }

  setPage = (page) => {
    this.currentPage = page;
  }

  updateOrderStatus = (orderId, orderStatus) => {
    this.orders = this.orders.map((order) => (order.id === orderId ? { ...order, orderStatus } : order));
    this.persistOrders();
  }

  updatePaymentStatus = (orderId, paymentStatus) => {
    this.orders = this.orders.map((order) => (order.id === orderId ? { ...order, paymentStatus } : order));
    this.persistOrders();
  }
}

const adminOrderStore = new AdminOrderStore();

export default adminOrderStore;
