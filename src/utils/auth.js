// Authentication Utility - Uses Firebase Authentication
// Admin user must be created in Firebase Console → Authentication → Users

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

/**
 * Login with Firebase Authentication
 * @param {string} email - Admin email address
 * @param {string} password - Admin password
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const login = async (email, password) => {
  try {
    if (!auth) throw new Error('Firebase Auth not configured');
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: getFriendlyError(error.code) };
  }
};

/**
 * Logout current admin user
 */
export const logout = async () => {
  try {
    if (auth) await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
};

/**
 * Check if a user is currently signed in (synchronous snapshot)
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return auth?.currentUser != null;
};

/**
 * Get the currently signed-in admin user info
 * @returns {Object|null}
 */
export const getCurrentUser = () => {
  if (!auth?.currentUser) return null;
  return {
    username: auth.currentUser.email,
    email: auth.currentUser.email,
    uid: auth.currentUser.uid
  };
};

/**
 * Map Firebase Auth error codes to user-friendly messages
 */
const getFriendlyError = (code) => {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
    case 'auth/invalid-email':
      return 'Invalid email or password';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return 'Login failed. Please try again.';
  }
};
