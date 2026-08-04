import { makeAutoObservable } from 'mobx';
import Field from '../models/Field';
import vendorProfileData from '../data/vendorProfileData';

const PROFILE_STORAGE_KEY = 'shoppy-spot-vendor-profile';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : vendorProfileData;
  } catch {
    return vendorProfileData;
  }
}

class VendorProfileStore {
  profile = loadFromStorage();
  saved = false;

  storeNameField = new Field({ name: 'storeName', label: 'Store Name', placeholder: 'Enter your store name', type: 'text', required: true });
  storeDescriptionField = new Field({ name: 'storeDescription', label: 'Store Description', placeholder: 'Describe your store', type: 'text' });
  logoUrlField = new Field({ name: 'logoUrl', label: 'Logo URL', placeholder: 'Enter a logo image URL', type: 'url' });
  businessAddressField = new Field({ name: 'businessAddress', label: 'Business Address', placeholder: 'Enter your business address', type: 'text', required: true });
  phoneField = new Field({ name: 'phone', label: 'Phone No', placeholder: 'Enter phone number', type: 'tel', required: true, minLength: 10, maxLength: 10 });

  constructor() {
    makeAutoObservable(this);
    this.hydrateFields();
  }

  get fields() {
    return [this.storeNameField, this.storeDescriptionField, this.logoUrlField, this.businessAddressField, this.phoneField];
  }

  hydrateFields = () => {
    this.storeNameField.setValue(this.profile.storeName);
    this.storeDescriptionField.setValue(this.profile.storeDescription);
    this.logoUrlField.setValue(this.profile.logoUrl);
    this.businessAddressField.setValue(this.profile.businessAddress);
    this.phoneField.setValue(this.profile.phone);
  }

  saveProfile = () => {
    this.saved = false;
    this.fields.forEach((field) => field.validate());
    if (this.fields.some((field) => field.error)) {
      return false;
    }

    this.profile = {
      storeName: this.storeNameField.value.trim(),
      storeDescription: this.storeDescriptionField.value.trim(),
      logoUrl: this.logoUrlField.value.trim(),
      businessAddress: this.businessAddressField.value.trim(),
      phone: this.phoneField.value.trim(),
    };

    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(this.profile));
    } catch {
      // storage unavailable - change still works in-memory for this session
    }

    this.saved = true;
    return true;
  }
}

const vendorProfileStore = new VendorProfileStore();

export default vendorProfileStore;
