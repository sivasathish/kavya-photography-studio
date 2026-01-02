// Simple Authentication Utility
// Hardcoded credentials for admin access

const AUTH_STORAGE_KEY = 'kavya_admin_auth';

// Hardcoded admin credentials - CHANGE THESE!
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'Kavya@2026'  // Change this to your preferred password
};

export const login = (username, password) => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const authData = {
      isAuthenticated: true,
      username: username,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    return { success: true };
  }
  return { success: false, error: 'Invalid username or password' };
};

export const logout = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = () => {
  const authData = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!authData) return false;
  
  try {
    const parsed = JSON.parse(authData);
    return parsed.isAuthenticated === true;
  } catch {
    return false;
  }
};

export const getCurrentUser = () => {
  const authData = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!authData) return null;
  
  try {
    return JSON.parse(authData);
  } catch {
    return null;
  }
};
