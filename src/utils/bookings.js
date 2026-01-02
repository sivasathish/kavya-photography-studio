// Booking Management Service - localStorage based
const BOOKINGS_STORAGE_KEY = 'kavya_bookings';

/**
 * Save a new booking to localStorage
 * @param {Object} bookingData - The booking form data
 * @returns {Object} The saved booking with ID and timestamp
 */
export const saveBooking = (bookingData) => {
  try {
    const existingBookings = getBookings();
    
    const newBooking = {
      id: Date.now().toString(),
      ...bookingData,
      createdAt: new Date().toISOString(),
      status: 'pending' // pending, confirmed, cancelled
    };
    
    const updatedBookings = [newBooking, ...existingBookings];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
    
    return { success: true, booking: newBooking };
  } catch (error) {
    console.error('Error saving booking:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get all bookings from localStorage
 * @returns {Array} Array of booking objects
 */
export const getBookings = () => {
  try {
    const bookingsData = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return bookingsData ? JSON.parse(bookingsData) : [];
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    return [];
  }
};

/**
 * Get a single booking by ID
 * @param {string} bookingId - The booking ID
 * @returns {Object|null} The booking object or null if not found
 */
export const getBookingById = (bookingId) => {
  const bookings = getBookings();
  return bookings.find(booking => booking.id === bookingId) || null;
};

/**
 * Update booking status
 * @param {string} bookingId - The booking ID
 * @param {string} status - New status (pending, confirmed, cancelled)
 * @returns {Object} Success result
 */
export const updateBookingStatus = (bookingId, status) => {
  try {
    const bookings = getBookings();
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex === -1) {
      return { success: false, error: 'Booking not found' };
    }
    
    bookings[bookingIndex].status = status;
    bookings[bookingIndex].updatedAt = new Date().toISOString();
    
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    
    return { success: true, booking: bookings[bookingIndex] };
  } catch (error) {
    console.error('Error updating booking:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete a booking
 * @param {string} bookingId - The booking ID
 * @returns {Object} Success result
 */
export const deleteBooking = (bookingId) => {
  try {
    const bookings = getBookings();
    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get bookings count by status
 * @returns {Object} Count object with pending, confirmed, cancelled counts
 */
export const getBookingStats = () => {
  const bookings = getBookings();
  return {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };
};
