import { makeAutoObservable, runInAction } from 'mobx';
import AppConstants from '../utils/AppConstants';
import Field from '../models/Field';
import authData from '../data/authData';
import cartStore from './cartStore';
import { clearAllCookies } from '../utils/helperFunctions';

const AUTH_STORAGE_KEY = 'shoppy-spot-auth';

// Simulated network latency for the dummy login/signup flow, so the loading state is visible.
const AUTH_DELAY_MS = 500;

const loadSessionFromStorage = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const generateSessionId = () => {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

class AuthStore {
  // { user: { id, name, email, role }, sessionId } | null
  session = loadSessionFromStorage();

  // Dummy account directory - dummy accounts plus anyone who signs up this session
  users = [...authData];

  isSubmitting = false;
  errorMessage = '';

  // Login Fields
  loginEmailField = new Field({ ...AppConstants.AUTH_EMAIL_FIELD, required: true });
  loginPasswordField = new Field({ ...AppConstants.PASSWORD_FIELD, required: true });

  // Signup Fields
  signupNameField = new Field({ ...AppConstants.NAME_FIELD, required: true });
  signupEmailField = new Field({ ...AppConstants.AUTH_EMAIL_FIELD, required: true });
  signupPasswordField = new Field({ ...AppConstants.PASSWORD_FIELD, required: true, minLength: 6 });
  signupConfirmPasswordField = new Field({ ...AppConstants.CONFIRM_PASSWORD_FIELD, required: true });

  constructor() {
    makeAutoObservable(this);

    // Rehydrate the cart from storage only for a returning logged-in session -
    // a guest's cart never touches storage, so there's nothing to load otherwise.
    if (this.session) {
      cartStore.enablePersistence();
      cartStore.loadFromStorage();
    }
  }

  get isAuthenticated() {
    return !!this.session;
  }

  get currentUser() {
    return this.session?.user ?? null;
  }

  get loginFields() {
    return [this.loginEmailField, this.loginPasswordField];
  }

  get signupFields() {
    return [this.signupNameField, this.signupEmailField, this.signupPasswordField, this.signupConfirmPasswordField];
  }

  persist = () => {
    try {
      if (this.session) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.session));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // storage unavailable (e.g. private browsing quota) - session still works in-memory
    }
  }

  clearError = () => {
    this.errorMessage = '';
  }

  resetLoginFields = () => {
    this.loginEmailField.reset();
    this.loginPasswordField.reset();
    this.errorMessage = '';
  }

  resetSignupFields = () => {
    this.signupNameField.reset();
    this.signupEmailField.reset();
    this.signupPasswordField.reset();
    this.signupConfirmPasswordField.reset();
    this.errorMessage = '';
  }

  login = async () => {
    this.errorMessage = '';
    this.loginFields.forEach((field) => field.validate());
    if (this.loginFields.some((field) => field.error)) {
      return false;
    }

    this.isSubmitting = true;
    await new Promise((resolve) => setTimeout(resolve, AUTH_DELAY_MS));

    const email = this.loginEmailField.value.trim().toLowerCase();
    const match = this.users.find(
      (user) => user.email.toLowerCase() === email && user.password === this.loginPasswordField.value
    );

    return runInAction(() => {
      this.isSubmitting = false;
      if (!match) {
        this.errorMessage = AppConstants.INVALID_CREDENTIALS_MESSAGE;
        return false;
      }
      this.setSession(match);
      this.resetLoginFields();
      return true;
    });
  }

  signup = async () => {
    this.errorMessage = '';
    this.signupFields.forEach((field) => field.validate());

    if (
      this.signupPasswordField.value &&
      this.signupConfirmPasswordField.value &&
      this.signupPasswordField.value !== this.signupConfirmPasswordField.value
    ) {
      this.signupConfirmPasswordField.error = AppConstants.PASSWORD_MISMATCH_MESSAGE;
    }

    if (this.signupFields.some((field) => field.error)) {
      return false;
    }

    this.isSubmitting = true;
    await new Promise((resolve) => setTimeout(resolve, AUTH_DELAY_MS));

    const email = this.signupEmailField.value.trim().toLowerCase();
    const exists = this.users.some((user) => user.email.toLowerCase() === email);

    return runInAction(() => {
      this.isSubmitting = false;
      if (exists) {
        this.errorMessage = AppConstants.EMAIL_ALREADY_EXISTS_MESSAGE;
        return false;
      }

      // New signups default to the "customer" role - admin/vendor accounts are demo-only for now.
      const newUser = {
        id: `u-${Date.now()}`,
        name: this.signupNameField.value.trim(),
        email: this.signupEmailField.value.trim(),
        password: this.signupPasswordField.value,
        role: 'customer',
      };
      this.users = [...this.users, newUser];
      this.setSession(newUser);
      this.resetSignupFields();
      return true;
    });
  }

  setSession = (user) => {
    const { id, name, email, role } = user;
    this.session = { user: { id, name, email, role }, sessionId: generateSessionId() };
    this.persist();

    // Whatever was in the guest cart now belongs to this account - start saving it.
    cartStore.enablePersistence();
    cartStore.persist();
  }

  // Wipes the session plus every other piece of app data in storage, so logging out
  // leaves no trace of the previous user in cookies or localStorage.
  logout = () => {
    this.session = null;
    this.persist();
    cartStore.clearCart(); // still persistent here, so this also removes the stored cart
    cartStore.disablePersistence(); // any items added while logged out stay session-only
    clearAllCookies();
  }
}

const authStore = new AuthStore();

export default authStore;
