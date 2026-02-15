// Firestore Service - All database operations
// This service handles CRUD operations for photos and bookings
// Compatible with future Android app using the same Firestore structure

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
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
    // Check if Firebase is configured
    if (!db) {
      console.warn('Firebase not configured, returning empty array');
      return [];
    }
    
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
    return []; // Return empty array instead of throwing
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
 * Upload image or video to Firebase Storage
 * @param {File} file - Image or video file to upload
 * @param {string} folder - Storage folder path
 * @returns {Promise<Object>} Object with downloadURL and fullPath
 */
export const uploadImage = async (file, folder = 'photos') => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage not configured');
    }
    
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      downloadURL,
      fullPath: snapshot.ref.fullPath
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Delete file from Firebase Storage
 * @param {string} filePath - Full path of file in storage
 * @returns {Promise<void>}
 */
export const deleteFromStorage = async (filePath) => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage not configured');
    }
    
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting from storage:', error);
    throw error;
  }
};

/**
 * Delete a photo from both Firestore and Storage (Admin only)
 * @param {string} photoId - Photo document ID
 * @param {string} storagePath - Full path of file in storage
 * @returns {Promise<void>}
 */
export const deletePhoto = async (photoId, storagePath) => {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    // Delete from Firestore
    const photoRef = doc(db, 'photos', photoId);
    await deleteDoc(photoRef);
    
    // Delete from Storage if path provided
    if (storagePath) {
      await deleteFromStorage(storagePath);
    }
  } catch (error) {
    console.error('Error deleting photo:', error);
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
// COMMENTS AND REVIEWS COLLECTION OPERATIONS
// ============================================

/**
 * Get all comments for a specific photo
 * @param {string} photoId - Photo ID to fetch comments for
 * @returns {Promise<Array>} Array of comment objects
 */
export const getPhotoComments = async (photoId) => {
  try {
    // Check if Firebase is configured
    if (!db) {
      console.warn('Firebase not configured');
      return [];
    }
    
    const commentsRef = collection(db, 'comments');
    const q = query(
      commentsRef,
      where('photoId', '==', photoId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return []; // Return empty array instead of throwing
  }
};

/**
 * Add a comment/review to a photo
 * @// Check if Firebase is configured
    if (!db) {
      throw new Error('Firebase not configured. Please set up Firebase to add comments.');
    }
    
    param {string} photoId - Photo ID to add comment to
 * @param {Object} commentData - Comment data (name, email, comment, rating)
 * @returns {Promise<Object>} Created comment with ID
 */
export const addPhotoComment = async (photoId, commentData) => {
  try {
    const commentsRef = collection(db, 'comments');
    
    const newComment = {
      photoId: photoId,
      name: commentData.name,
      email: commentData.email || '',
      comment: commentData.comment,
      rating: commentData.rating || 5,
      approved: true, // Auto-approve for now
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(commentsRef, newComment);
    
    return {
      id: docRef.id,
      ...newComment,
      createdAt: new Date() // Return local time for immediate display
    };
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

/**
 * Delete a comment (Admin only)
 * @param {string} commentId - Comment document ID
 * @returns {Promise<void>}
 */
export const deletePhotoComment = async (commentId) => {
  try {
    const commentRef = doc(db, 'comments', commentId);
    await deleteDoc(commentRef);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

/**
 * Get comment count for a photo
 * @param {string} photoId - Photo ID
 * @returns {Promise<number>} Number of comments
 */
export const getCommentCount = async (photoId) => {
  try {
    const comments = await getPhotoComments(photoId);
    return comments.length;
  } catch (error) {
    console.error('Error getting comment count:', error);
    return 0;
  }
};

/**
 * Get average rating for a photo
 * @param {string} photoId - Photo ID
 * @returns {Promise<number>} Average rating (0 if no ratings)
 */
export const getAverageRating = async (photoId) => {
  try {
    const comments = await getPhotoComments(photoId);
    if (comments.length === 0) return 0;
    
    const sum = comments.reduce((acc, comment) => acc + (comment.rating || 0), 0);
    return parseFloat((sum / comments.length).toFixed(1));
  } catch (error) {
    console.error('Error getting average rating:', error);
    return 0;
  }
};

/**
 * Get all comments across all photos (for admin view)
 * @returns {Promise<Array>} Array of all comments
 */
export const getAllCommentsFlat = async () => {
  try {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return comments;
  } catch (error) {
    console.error('Error fetching all comments:', error);
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
