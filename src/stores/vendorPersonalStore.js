import { makeAutoObservable } from 'mobx';
import Field from '../models/Field';
import vendorPersonalData from '../data/vendorPersonalData';

const PERSONAL_STORAGE_KEY = 'shoppy-spot-vendor-personal';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(PERSONAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : vendorPersonalData;
  } catch {
    return vendorPersonalData;
  }
}

// Same shape as vendorProfileStore, but for the vendor's own personal details
// rather than the public-facing store profile.
class VendorPersonalStore {
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

  // Re-hydrate from the last saved profile each time the dialog opens, so a
  // cancelled edit never leaves stale values behind for next time.
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

const vendorPersonalStore = new VendorPersonalStore();

export default vendorPersonalStore;
