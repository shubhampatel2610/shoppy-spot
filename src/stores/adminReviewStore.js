import { makeAutoObservable } from 'mobx';
import Field from '../models/Field';
import adminReviewsData from '../data/adminReviewsData';

const REVIEWS_STORAGE_KEY = 'shoppy-spot-admin-reviews';

const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Cross-vendor review moderation - delete only, admin doesn't author or edit reviews.
class AdminReviewStore {
  reviews = loadFromStorage(REVIEWS_STORAGE_KEY, adminReviewsData);

  searchQuery = '';
  ratingFilterField = new Field({ name: 'ratingFilter', label: 'Rating', type: 'text', value: '' });
  vendorFilterField = new Field({ name: 'vendorFilter', label: 'Vendor', type: 'text', value: '' });

  constructor() {
    makeAutoObservable(this);
  }

  get filteredReviews() {
    let list = [...this.reviews];
    if (this.ratingFilterField.value) {
      list = list.filter((r) => String(r.rating) === this.ratingFilterField.value);
    }
    if (this.vendorFilterField.value) {
      list = list.filter((r) => r.vendorId === this.vendorFilterField.value);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter((r) => r.productTitle.toLowerCase().includes(q));
    }
    return list;
  }

  persistReviews = () => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
    } catch {
      // storage unavailable - changes still work in-memory for this session
    }
  }

  setSearchQuery = (query) => {
    this.searchQuery = query;
  }

  deleteReview = (id) => {
    this.reviews = this.reviews.filter((r) => r.id !== id);
    this.persistReviews();
  }
}

const adminReviewStore = new AdminReviewStore();

export default adminReviewStore;
