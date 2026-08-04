import { makeAutoObservable } from 'mobx';
import AppConstants from '../utils/AppConstants';

const CART_STORAGE_KEY = 'shoppy-spot-cart';

// Minimum amount that must remain in the bill after a coupon discount is applied,
// so e.g. a $50-off coupon can't be used to wipe out a $3 cart.
const MIN_ORDER_BUFFER = 10;

// Mock coupon codes for the simulated checkout flow, keyed by code for lookup.
const COUPONS = AppConstants.AVAILABLE_COUPONS.reduce((map, coupon) => {
  map[coupon.code] = coupon;
  return map;
}, {});

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
  // Starts empty (not hydrated from storage) - guests get a session-only cart until they log in.
  items = [];

  // Only a logged-in user's cart is written to localStorage - authStore toggles this on login/logout.
  isPersistent = false;

  // Coupon Constants
  couponInput = '';
  appliedCoupon = null;
  couponError = null;

  constructor() {
    makeAutoObservable(this);
  }

  enablePersistence = () => {
    this.isPersistent = true;
  }

  disablePersistence = () => {
    this.isPersistent = false;
  }

  loadFromStorage = () => {
    this.items = loadItemsFromStorage();
  }

  persist = () => {
    if (!this.isPersistent) {
      return;
    }
    try {
      if (this.items.length === 0) {
        localStorage.removeItem(CART_STORAGE_KEY);
      } else {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      }
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

  // Smallest subtotal at which this coupon still leaves MIN_ORDER_BUFFER in the bill.
  getMinOrderValue = (coupon) => {
    if (coupon.type === 'percent') {
      return MIN_ORDER_BUFFER / (1 - coupon.value / 100);
    }
    return coupon.value + MIN_ORDER_BUFFER;
  }

  isCouponEligible = (coupon) => {
    return this.subtotal >= this.getMinOrderValue(coupon);
  }

  amountNeededFor = (coupon) => {
    return Math.max(0, this.getMinOrderValue(coupon) - this.subtotal);
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
    this.revalidateCoupon();
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
    this.revalidateCoupon();
    this.persist();
  }

  clearCart = () => {
    this.items = [];
    this.removeCoupon();
    this.persist();
  }

  // Coupon Actions
  // Coupon codes are always uppercase, so keystrokes are normalized as they're typed.
  setCouponInput = (value) => {
    this.couponInput = value.toUpperCase();
    this.couponError = null;
  }

  applyCoupon = () => {
    const code = this.couponInput.trim();
    const coupon = COUPONS[code];
    if (!coupon) {
      this.appliedCoupon = null;
      this.couponError = AppConstants.INVALID_COUPON_MESSAGE;
      return;
    }
    if (!this.isCouponEligible(coupon)) {
      this.appliedCoupon = null;
      const needed = this.amountNeededFor(coupon).toFixed(2);
      this.couponError = `${AppConstants.COUPON_MIN_ORDER_PREFIX} $${needed} ${AppConstants.COUPON_MIN_ORDER_SUFFIX}`;
      return;
    }
    this.appliedCoupon = coupon;
    this.couponError = null;
  }

  // Used when a coupon is picked from the "View All Coupons" list.
  selectCoupon = (code) => {
    this.setCouponInput(code);
    this.applyCoupon();
  }

  // Called after any change that can shrink the subtotal, so an applied coupon
  // that no longer meets its minimum order value is dropped automatically.
  revalidateCoupon = () => {
    if (this.appliedCoupon && !this.isCouponEligible(this.appliedCoupon)) {
      this.appliedCoupon = null;
      this.couponInput = '';
      this.couponError = AppConstants.COUPON_AUTO_REMOVED_MESSAGE;
    }
  }

  removeCoupon = () => {
    this.appliedCoupon = null;
    this.couponInput = '';
    this.couponError = null;
  }
}

const cartStore = new CartStore();

export default cartStore;
