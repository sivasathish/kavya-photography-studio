// Comments Management Utility
// Store and manage photo comments in Firestore

import {
  getPhotoComments as fetchPhotoComments,
  addPhotoComment,
  deletePhotoComment,
  getCommentCount as fetchCommentCount,
  getAverageRating as fetchAverageRating,
  getAllCommentsFlat as fetchAllCommentsFlat
} from '../firebase/firestoreService';

// Get comments for a specific photo
export const getPhotoComments = async (photoId) => {
  try {
    return await fetchPhotoComments(photoId);
  } catch (error) {
    console.error('Error getting photo comments:', error);
    return [];
  }
};

// Add a comment to a photo
export const addComment = async (photoId, commentData) => {
  try {
    const newComment = await addPhotoComment(photoId, commentData);
    return { success: true, comment: newComment };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false, error: 'Failed to add comment' };
  }
};

// Delete a comment
export const deleteComment = async (photoId, commentId) => {
  try {
    await deletePhotoComment(commentId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false, error: 'Failed to delete comment' };
  }
};

// Get comment count for a photo
export const getCommentCount = async (photoId) => {
  try {
    return await fetchCommentCount(photoId);
  } catch (error) {
    console.error('Error getting comment count:', error);
    return 0;
  }
};

// Get average rating for a photo
export const getAverageRating = async (photoId) => {
  try {
    return await fetchAverageRating(photoId);
  } catch (error) {
    console.error('Error getting average rating:', error);
    return 0;
  }
};

// Get all comments across all photos (for admin view)
export const getAllCommentsFlat = async () => {
  try {
    return await fetchAllCommentsFlat();
  } catch (error) {
    console.error('Error getting all comments:', error);
    return [];
  }
};

// ============================================
// LEGACY LOCALSTORAGE FUNCTIONS (For Migration)
// ============================================
// These functions can help migrate existing localStorage data to Firestore

const COMMENTS_STORAGE_KEY = 'kavya_photo_comments';

/**
 * Get all comments from localStorage (for migration purposes)
 * @returns {Object} Comments object from localStorage
 */
export const getLocalStorageComments = () => {
  try {
    const comments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    return comments ? JSON.parse(comments) : {};
  } catch (error) {
    console.error('Error reading localStorage comments:', error);
    return {};
  }
};

/**
 * Clear all comments from localStorage after migration
 */
export const clearLocalStorageComments = () => {
  try {
    localStorage.removeItem(COMMENTS_STORAGE_KEY);
    console.log('LocalStorage comments cleared');
  } catch (error) {
    console.error('Error clearing localStorage comments:', error);
  }
};
