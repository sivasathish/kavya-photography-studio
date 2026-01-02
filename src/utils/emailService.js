// EmailJS Service - Send email notifications for bookings
import emailjs from '@emailjs/browser';

// EmailJS Configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Initialize EmailJS with public key
 */
const initEmailJS = () => {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
};

// Initialize on module load
initEmailJS();

/**
 * Send booking notification email
 * @param {Object} bookingData - The booking information
 * @returns {Promise<Object>} Success or error result
 */
export const sendBookingEmail = async (bookingData) => {
  try {
    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured. Email notification skipped.');
      return { 
        success: false, 
        error: 'EmailJS not configured',
        skipped: true 
      };
    }

    // Prepare template parameters
    const templateParams = {
      to_name: 'Kaviya Photography', // Your business name
      from_name: bookingData.name,
      customer_name: bookingData.name,
      customer_phone: bookingData.phone,
      customer_email: bookingData.email,
      event_type: bookingData.eventType,
      event_date: bookingData.date,
      message: bookingData.message || 'No additional message',
      booking_date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    
    return { 
      success: true, 
      response 
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error.text || error.message 
    };
  }
};

/**
 * Send test email to verify EmailJS configuration
 * @param {string} testEmail - Email address to send test to
 * @returns {Promise<Object>} Success or error result
 */
export const sendTestEmail = async (testEmail) => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS not configured');
    }

    const templateParams = {
      to_name: 'Kaviya Photography',
      from_name: 'Test User',
      customer_name: 'Test User',
      customer_phone: '1234567890',
      customer_email: testEmail,
      event_type: 'Test Booking',
      event_date: new Date().toISOString().split('T')[0],
      message: 'This is a test booking to verify EmailJS configuration.',
      booking_date: new Date().toLocaleString()
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Test email failed:', error);
    return { success: false, error: error.text || error.message };
  }
};

/**
 * Check if EmailJS is properly configured
 * @returns {boolean} True if configured, false otherwise
 */
export const isEmailJSConfigured = () => {
  return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
};
