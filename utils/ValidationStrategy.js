// frontend/src/utils/ValidationStrategy.js

export const ValidationStrategy = {
  // Individual Rules (Strategies)
  hasLength: (password) => password.length >= 8,
  hasUppercase: (password) => /[A-Z]/.test(password),
  hasNumber: (password) => /\d/.test(password),
  
  isValidEmail: (email) => {
    const allowedDomains = /@(gmail\.com|hotmail\.com|yahoo\.com|icloud\.com)$/i;
    return allowedDomains.test(email);
  },

  isValidPhone: (phone) => /^01[0125][0-9]{8}$/.test(phone),

  isPasswordStrong: (password) => {
    const hasU = /[A-Z]/.test(password);
    const hasL = /[a-z]/.test(password);
    const hasN = /\d/.test(password);
    const hasLen = password.length >= 8;
    return hasU && hasL && hasN && hasLen;
  },

  isValidAddress: (address) => address.trim().length >= 10,

  doPasswordsMatch: (password, confirmPassword) => {
    return password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  }
};