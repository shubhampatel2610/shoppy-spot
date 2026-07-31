// Validate a URL string
export const checkUrl = (value) => {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
};

// Validate an email address
export const checkEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Validate a 10 digit phone number
export const checkPhone = (value) => /^\d{10}$/.test(value);
