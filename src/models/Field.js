import { makeAutoObservable } from "mobx";
import AppConstants from "../utils/AppConstants";
import { checkUrl, checkEmail, checkPhone } from "../utils/helperFunctions";

// Reusable observable form field with built-in validation, used by any store that needs input state.
class Field {
    constructor(config) {
        this.name = config.name;
        this.label = config.label ?? "";
        this.placeholder = config.placeholder ?? "";
        this.value = config.value ?? "";
        this.minLength = config.minLength;
        this.maxLength = config.maxLength;
        this.required = config.required ?? false;
        this.type = config.type ?? "text";
        this.error = "";

        makeAutoObservable(this);
    }

    setValue(val) {
        this.value = val;
    }

    validate() {
        if (this.required && !this.value) {
            this.error = `${this.label} ${AppConstants.REQUIRED_POSTFIX}`;
            return;
        }

        if (this.minLength && this.value.length < this.minLength) {
            this.error = `${AppConstants.MINIMUM_PREFIX} ${this.minLength} ${AppConstants.CHARS_REQUIRED_POSTFIX}`;
            return;
        }

        if (this.maxLength && this.value.length > this.maxLength) {
            this.error = `${AppConstants.MAXIMUM_PREFIX} ${this.maxLength} ${AppConstants.CHARS_ALLOWED_POSTFIX}`;
            return;
        }

        if (this.type === "url" && this.value.length > 0 && !checkUrl(this.value)) {
            this.error = `${AppConstants.REQUEST_ENTER_PREFIX} ${AppConstants.VALID_URL_POSTFIX}`;
            return;
        }

        if (this.type === "email" && this.value.length > 0 && !checkEmail(this.value)) {
            this.error = `${AppConstants.REQUEST_ENTER_PREFIX} ${AppConstants.VALID_EMAIL_POSTFIX}`;
            return;
        }

        if (this.type === "tel" && this.value.length > 0 && !checkPhone(this.value)) {
            this.error = `${AppConstants.REQUEST_ENTER_PREFIX} ${AppConstants.VALID_PHONE_POSTFIX}`;
            return;
        }

        this.error = "";
    }

    reset() {
        this.value = "";
        this.error = "";
    }
}

export default Field;
