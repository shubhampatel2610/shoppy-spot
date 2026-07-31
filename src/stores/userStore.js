import { makeAutoObservable, runInAction } from 'mobx';
import AppConstants from '../utils/AppConstants';
import Field from '../models/Field';
import userData from '../data/userData';

class UserStore {
  // Saved data - stands in for the backend record until an API is wired up
  profile = {
    firstName: userData.firstName,
    middleName: userData.middleName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    gender: userData.gender,
  };
  address = { ...userData.address };

  // User Details Page State
  isLoading = false;

  // Dialog visibility
  isProfileDialogOpen = false;
  isAddressDialogOpen = false;

  // Profile Fields
  firstNameField = new Field({ ...AppConstants.FIRST_NAME_FIELD, required: true });
  middleNameField = new Field(AppConstants.MIDDLE_NAME_FIELD);
  lastNameField = new Field({ ...AppConstants.LAST_NAME_FIELD, required: true });
  emailField = new Field({ ...AppConstants.EMAIL_FIELD, required: true });
  phoneField = new Field({ ...AppConstants.PHONE_FIELD, required: true, minLength: 10, maxLength: 10 });
  genderField = new Field(AppConstants.GENDER_FIELD);

  // Address Fields
  buildingNoField = new Field({ ...AppConstants.BUILDING_NO_FIELD, required: true });
  streetNameField = new Field({ ...AppConstants.STREET_NAME_FIELD, required: true });
  landmarkField = new Field(AppConstants.LANDMARK_FIELD);
  cityField = new Field({ ...AppConstants.CITY_FIELD, required: true });
  pincodeField = new Field({ ...AppConstants.PINCODE_FIELD, required: true, minLength: 6, maxLength: 6 });
  stateField = new Field({ ...AppConstants.STATE_FIELD, required: true });
  countryField = new Field({ ...AppConstants.COUNTRY_FIELD, required: true });

  constructor() {
    makeAutoObservable(this);
  }

  get profileFields() {
    return [this.firstNameField, this.middleNameField, this.lastNameField, this.emailField, this.phoneField];
  }

  get addressFields() {
    return [this.buildingNoField, this.streetNameField, this.landmarkField, this.cityField, this.pincodeField, this.stateField, this.countryField];
  }

  get hasAddress() {
    return Object.values(this.address).some(Boolean);
  }

  // Full formatted address for display
  get formattedAddress() {
    const { buildingNo, streetName, landmark, city, state, pincode, country } = this.address;
    return [buildingNo, streetName, landmark, city, state, pincode, country].filter(Boolean).join(', ');
  }

  // Load the user record - awaits a resolved promise for now, swap in a real API call later
  loadUser = async () => {
    this.isLoading = true;
    try {
      const data = await Promise.resolve(userData);
      runInAction(() => {
        this.profile = {
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
        };
        this.address = { ...data.address };
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Profile Dialog Actions
  openProfileDialog = () => {
    this.firstNameField.setValue(this.profile.firstName);
    this.middleNameField.setValue(this.profile.middleName);
    this.lastNameField.setValue(this.profile.lastName);
    this.emailField.setValue(this.profile.email);
    this.phoneField.setValue(this.profile.phone);
    this.genderField.setValue(this.profile.gender);
    this.isProfileDialogOpen = true;
  }

  closeProfileDialog = () => {
    this.isProfileDialogOpen = false;
  }

  saveProfile = () => {
    this.profileFields.forEach((field) => field.validate());
    if (this.profileFields.some((field) => field.error)) {
      return false;
    }

    this.profile = {
      firstName: this.firstNameField.value,
      middleName: this.middleNameField.value,
      lastName: this.lastNameField.value,
      email: this.emailField.value,
      phone: this.phoneField.value,
      gender: this.genderField.value,
    };
    this.isProfileDialogOpen = false;
    return true;
  }

  // Address Dialog Actions
  openAddressDialog = () => {
    this.buildingNoField.setValue(this.address.buildingNo);
    this.streetNameField.setValue(this.address.streetName);
    this.landmarkField.setValue(this.address.landmark);
    this.cityField.setValue(this.address.city);
    this.pincodeField.setValue(this.address.pincode);
    this.stateField.setValue(this.address.state);
    this.countryField.setValue(this.address.country);
    this.isAddressDialogOpen = true;
  }

  closeAddressDialog = () => {
    this.isAddressDialogOpen = false;
  }

  saveAddress = () => {
    this.addressFields.forEach((field) => field.validate());
    if (this.addressFields.some((field) => field.error)) {
      return false;
    }

    this.address = {
      buildingNo: this.buildingNoField.value,
      streetName: this.streetNameField.value,
      landmark: this.landmarkField.value,
      city: this.cityField.value,
      pincode: this.pincodeField.value,
      state: this.stateField.value,
      country: this.countryField.value,
    };
    this.isAddressDialogOpen = false;
    return true;
  }
}

const userStore = new UserStore();

export default userStore;
