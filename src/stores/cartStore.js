import { makeAutoObservable } from 'mobx';
import AppConstants from '../utils/AppConstants';

const CART_STORAGE_KEY = 'shoppy-spot-cart';

// Mock coupon codes for the simulated checkout flow.
const COUPONS = {
  SAVE10: { code: 'SAVE10', type: 'percent', value: 10, label: '10% off' },
  SAVE20: { code: 'SAVE20', type: 'percent', value: 20, label: '20% off' },
  FLAT50: { code: 'FLAT50', type: 'flat', value: 50, label: '$50 off' },
};

const loadItemsFromStorage = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

class CartStore {
  // Each item: { id, title, price, thumbnail, stock, quantity }
  items = loadItemsFromStorage();

  // Coupon Constants
  couponInput = '';
  appliedCoupon = null;
  couponError = null;

  constructor() {
    makeAutoObservable(this);
  }

  persist = () => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
    } catch {
      // storage unavailable (e.g. private browsing quota) - cart still works in-memory
    }
  }

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get isEmpty() {
    return this.items.length === 0;
  }

  get subtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get discountAmount() {
    if (!this.appliedCoupon) {
      return 0;
    }
    const { type, value } = this.appliedCoupon;
    const raw = type === 'percent' ? (this.subtotal * value) / 100 : value;
    return Math.min(raw, this.subtotal);
  }

  get total() {
    return this.subtotal - this.discountAmount;
  }

  addToCart = (product, quantity = 1) => {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items = [...this.items, {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        quantity,
      }];
    }
    this.persist();
  }

  removeFromCart = (productId) => {
    this.items = this.items.filter(item => item.id !== productId);
    this.persist();
  }

  setQuantity = (productId, quantity) => {
    if (quantity < 1) {
      this.removeFromCart(productId);
      return;
    }
    const item = this.items.find(item => item.id === productId);
    if (!item) {
      return;
    }
    item.quantity = quantity;
    this.persist();
  }

  clearCart = () => {
    this.items = [];
    this.removeCoupon();
    this.persist();
  }

  // Coupon Actions
  setCouponInput = (value) => {
    this.couponInput = value;
    this.couponError = null;
  }

  applyCoupon = () => {
    const code = this.couponInput.trim().toUpperCase();
    const coupon = COUPONS[code];
    if (!coupon) {
      this.appliedCoupon = null;
      this.couponError = AppConstants.INVALID_COUPON_MESSAGE;
      return;
    }
    this.appliedCoupon = coupon;
    this.couponError = null;
  }

  removeCoupon = () => {
    this.appliedCoupon = null;
    this.couponInput = '';
    this.couponError = null;
  }
}

const cartStore = new CartStore();

export default cartStore;
