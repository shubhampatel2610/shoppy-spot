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

// Erase every cookie visible to this page (used on logout, alongside clearing localStorage)
export const clearAllCookies = () => {
    document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0].trim();
        if (name) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        }
    });
};
