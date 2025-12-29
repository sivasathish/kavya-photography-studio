// Firestore Service - All database operations
// This service handles CRUD operations for photos and bookings
// Compatible with future Android app using the same Firestore structure

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaseConfig';

// ============================================
// PHOTOS COLLECTION OPERATIONS
// ============================================

/**
 * Fetch all photos from Firestore
 * @returns {Promise<Array>} Array of photo objects
 */
export const getAllPhotos = async () => {
  try {
    const photosRef = collection(db, 'photos');
    const q = query(photosRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const photos = [];
    querySnapshot.forEach((doc) => {
      photos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

/**
 * Fetch photos by category
 * @param {string} category - Photo category (Wedding, Portrait, Events, Studio)
 * @returns {Promise<Array>} Array of filtered photo objects
 */
export const getPhotosByCategory = async (category) => {
  try {
    const photosRef = collection(db, 'photos');
    const q = query(
      photosRef,
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const photos = [];
    querySnapshot.forEach((doc) => {
      photos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return photos;
  } catch (error) {
    console.error('Error fetching photos by category:', error);
    throw error;
  }
};

/**
 * Fetch latest photos (for homepage)
 * @param {number} limitCount - Number of photos to fetch
 * @returns {Promise<Array>} Array of latest photo objects
 */
export const getLatestPhotos = async (limitCount = 6) => {
  try {
    const photosRef = collection(db, 'photos');
    const q = query(
      photosRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    
    const photos = [];
    querySnapshot.forEach((doc) => {
      photos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return photos;
  } catch (error) {
    console.error('Error fetching latest photos:', error);
    throw error;
  }
};

/**
 * Add a new photo to Firestore (Admin only - requires authentication)
 * @param {Object} photoData - Photo data object
 * @returns {Promise<string>} Document ID of the created photo
 */
export const addPhoto = async (photoData) => {
  try {
    const photosRef = collection(db, 'photos');
    const docRef = await addDoc(photosRef, {
      ...photoData,
      createdAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding photo:', error);
    throw error;
  }
};

/**
 * Upload image to Firebase Storage
 * @param {File} file - Image file to upload
 * @param {string} folder - Storage folder path
 * @returns {Promise<string>} Download URL of uploaded image
 */
export const uploadImage = async (file, folder = 'photos') => {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// ============================================
// BOOKINGS COLLECTION OPERATIONS
// ============================================

/**
 * Create a new booking
 * @param {Object} bookingData - Booking information
 * @returns {Promise<string>} Document ID of the created booking
 */
export const createBooking = async (bookingData) => {
  try {
    const bookingsRef = collection(db, 'bookings');
    
    // Validate required fields
    const requiredFields = ['name', 'phone', 'email', 'eventType', 'date'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    const docRef = await addDoc(bookingsRef, {
      name: bookingData.name,
      phone: bookingData.phone,
      email: bookingData.email,
      eventType: bookingData.eventType,
      date: bookingData.date,
      message: bookingData.message || '',
      createdAt: serverTimestamp(),
      status: 'pending' // Can be used for booking management
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

/**
 * Fetch all bookings (Admin only - requires authentication)
 * @returns {Promise<Array>} Array of booking objects
 */
export const getAllBookings = async () => {
  try {
    const bookingsRef = collection(db, 'bookings');
    const q = query(bookingsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const bookings = [];
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

/**
 * Get a single booking by ID (Admin only)
 * @param {string} bookingId - Booking document ID
 * @returns {Promise<Object>} Booking object
 */
export const getBookingById = async (bookingId) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingSnap = await getDoc(bookingRef);
    
    if (bookingSnap.exists()) {
      return {
        id: bookingSnap.id,
        ...bookingSnap.data()
      };
    } else {
      throw new Error('Booking not found');
    }
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

// ============================================
// SAMPLE DATA GENERATOR (For Development)
// ============================================

/**
 * Generate sample photos for development
 * Note: Use this only in development to populate your database
 * @returns {Promise<void>}
 */
export const generateSamplePhotos = async () => {
  const samplePhotos = [
    {
      title: 'Beautiful Wedding Ceremony',
      category: 'Wedding',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      createdAt: Timestamp.now()
    },
    {
      title: 'Elegant Bride Portrait',
      category: 'Wedding',
      imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
      createdAt: Timestamp.now()
    },
    {
      title: 'Professional Headshot',
      category: 'Portrait',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      createdAt: Timestamp.now()
    },
    {
      title: 'Family Portrait Session',
      category: 'Portrait',
      imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
      createdAt: Timestamp.now()
    },
    {
      title: 'Corporate Event Coverage',
      category: 'Events',
      imageUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800',
      createdAt: Timestamp.now()
    },
    {
      title: 'Birthday Celebration',
      category: 'Events',
      imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
      createdAt: Timestamp.now()
    },
    {
      title: 'Studio Fashion Shoot',
      category: 'Studio',
      imageUrl: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?w=800',
      createdAt: Timestamp.now()
    },
    {
      title: 'Product Photography',
      category: 'Studio',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      createdAt: Timestamp.now()
    }
  ];

  try {
    for (const photo of samplePhotos) {
      await addDoc(collection(db, 'photos'), photo);
    }
    console.log('Sample photos added successfully');
  } catch (error) {
    console.error('Error adding sample photos:', error);
  }
};
