import { makeAutoObservable } from 'mobx';
import Field from '../models/Field';
import adminPersonalData from '../data/adminPersonalData';

const PERSONAL_STORAGE_KEY = 'shoppy-spot-admin-personal';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(PERSONAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : adminPersonalData;
  } catch {
    return adminPersonalData;
  }
}

// Same shape as vendorPersonalStore.js - admin's own personal details, no store
// profile since admin doesn't run a store.
class AdminPersonalStore {
  profile = loadFromStorage();
  isEditDialogOpen = false;

  nameField = new Field({ name: 'name', label: 'Full Name', placeholder: 'Enter your full name', type: 'text', required: true });
  emailField = new Field({ name: 'email', label: 'Email', placeholder: 'Enter your email address', type: 'email', required: true });
  phoneField = new Field({ name: 'phone', label: 'Phone No', placeholder: 'Enter phone number', type: 'tel', required: true, minLength: 10, maxLength: 10 });

  constructor() {
    makeAutoObservable(this);
    this.hydrateFields();
  }

  get fields() {
    return [this.nameField, this.emailField, this.phoneField];
  }

  hydrateFields = () => {
    this.nameField.setValue(this.profile.name);
    this.emailField.setValue(this.profile.email);
    this.phoneField.setValue(this.profile.phone);
  }

  openEditDialog = () => {
    this.hydrateFields();
    this.isEditDialogOpen = true;
  }

  closeEditDialog = () => {
    this.isEditDialogOpen = false;
  }

  saveProfile = () => {
    this.fields.forEach((field) => field.validate());
    if (this.fields.some((field) => field.error)) {
      return false;
    }

    this.profile = {
      name: this.nameField.value.trim(),
      email: this.emailField.value.trim(),
      phone: this.phoneField.value.trim(),
    };

    try {
      localStorage.setItem(PERSONAL_STORAGE_KEY, JSON.stringify(this.profile));
    } catch {
      // storage unavailable - change still works in-memory for this session
    }

    this.isEditDialogOpen = false;
    return true;
  }
}

const adminPersonalStore = new AdminPersonalStore();

export default adminPersonalStore;
