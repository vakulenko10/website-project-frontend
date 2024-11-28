export const validateForm = (formData) => {
    const errors = {};

    // Username validation
    if (!formData.username.trim()) {
        errors.username = "Username is required.";
    } else if (formData.username.length < 3) {
        errors.username = "Username must be at least 3 characters long.";
    }

    // Email validation
    if (!formData.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Email is not valid.";
    }

    // Password validation
    if (!formData.password.trim()) {
        errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters long.";
    }

    return errors;
};
