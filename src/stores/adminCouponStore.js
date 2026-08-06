import { makeAutoObservable } from 'mobx';
import Field from '../models/Field';
import adminCouponsData from '../data/adminCouponsData';

const COUPONS_STORAGE_KEY = 'shoppy-spot-admin-coupons';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(COUPONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : adminCouponsData;
  } catch {
    return adminCouponsData;
  }
}

// Admin-managed replacement for the old hardcoded AppConstants.AVAILABLE_COUPONS -
// CheckoutPage can be pointed at this store's `coupons` (filtered to isActive) as
// a follow-up wiring step.
class AdminCouponStore {
  coupons = loadFromStorage();

  isFormOpen = false;
  editingCouponId = null;
  codeField = new Field({ name: 'code', label: 'Coupon Code', placeholder: 'e.g. SAVE10', type: 'text', required: true });
  typeField = new Field({ name: 'type', label: 'Discount Type', type: 'text', value: 'percent' });
  valueField = new Field({ name: 'value', label: 'Discount Value', placeholder: 'Enter discount value', type: 'text', required: true });
  labelField = new Field({ name: 'label', label: 'Display Label', placeholder: 'e.g. 10% off your order', type: 'text', required: true });
  expiresAtField = new Field({ name: 'expiresAt', label: 'Expires On', placeholder: 'YYYY-MM-DD', type: 'text', required: true });

  constructor() {
    makeAutoObservable(this);
  }

  get formFields() {
    return [this.codeField, this.valueField, this.labelField, this.expiresAtField];
  }

  get activeCoupons() {
    return this.coupons.filter((c) => c.isActive);
  }

  persistCoupons = () => {
    try {
      localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(this.coupons));
    } catch {
      // storage unavailable - changes still work in-memory for this session
    }
  }

  resetForm = () => {
    this.editingCouponId = null;
    [this.codeField, this.valueField, this.labelField, this.expiresAtField].forEach((field) => field.reset());
    this.typeField.setValue('percent');
  }

  openAddForm = () => {
    this.resetForm();
    this.isFormOpen = true;
  }

  openEditForm = (id) => {
    const coupon = this.coupons.find((c) => c.id === id);
    if (!coupon) {
      return;
    }
    this.editingCouponId = id;
    this.codeField.setValue(coupon.code);
    this.typeField.setValue(coupon.type);
    this.valueField.setValue(String(coupon.value));
    this.labelField.setValue(coupon.label);
    this.expiresAtField.setValue(coupon.expiresAt.slice(0, 10));
    this.isFormOpen = true;
  }

  closeForm = () => {
    this.isFormOpen = false;
    this.resetForm();
  }

  saveCoupon = () => {
    this.formFields.forEach((field) => field.validate());

    const value = parseFloat(this.valueField.value);
    if (isNaN(value) || value <= 0) {
      this.valueField.error = 'Enter a valid discount value';
    }

    if (this.formFields.some((field) => field.error)) {
      return false;
    }

    const couponData = {
      code: this.codeField.value.trim().toUpperCase(),
      type: this.typeField.value,
      value,
      label: this.labelField.value.trim(),
      expiresAt: new Date(this.expiresAtField.value).toISOString(),
    };

    if (this.editingCouponId) {
      this.coupons = this.coupons.map((c) => (c.id === this.editingCouponId ? { ...c, ...couponData } : c));
    } else {
      this.coupons = [{ id: `cp-${Date.now()}`, isActive: true, ...couponData }, ...this.coupons];
    }

    this.persistCoupons();
    this.isFormOpen = false;
    this.resetForm();
    return true;
  }

  toggleActive = (id) => {
    this.coupons = this.coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c));
    this.persistCoupons();
  }

  deleteCoupon = (id) => {
    this.coupons = this.coupons.filter((c) => c.id !== id);
    this.persistCoupons();
  }
}

const adminCouponStore = new AdminCouponStore();

export default adminCouponStore;
