// Comments Management Utility
// Store and manage photo comments in localStorage

const COMMENTS_STORAGE_KEY = 'kavya_photo_comments';

// Get all comments
export const getAllComments = () => {
  try {
    const comments = localStorage.getItem(COMMENTS_STORAGE_KEY);
    return comments ? JSON.parse(comments) : {};
  } catch (error) {
    console.error('Error reading comments:', error);
    return {};
  }
};

// Get comments for a specific photo
export const getPhotoComments = (photoId) => {
  const allComments = getAllComments();
  return allComments[photoId] || [];
};

// Add a comment to a photo
export const addComment = (photoId, commentData) => {
  try {
    const allComments = getAllComments();
    
    const newComment = {
      id: Date.now().toString(),
      photoId: photoId,
      name: commentData.name,
      email: commentData.email || '',
      comment: commentData.comment,
      rating: commentData.rating || 5,
      createdAt: new Date().toISOString(),
      approved: true // Auto-approve for now, admin can delete if needed
    };

    if (!allComments[photoId]) {
      allComments[photoId] = [];
    }

    allComments[photoId].unshift(newComment); // Add to beginning
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(allComments));
    
    return { success: true, comment: newComment };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false, error: 'Failed to add comment' };
  }
};

// Delete a comment
export const deleteComment = (photoId, commentId) => {
  try {
    const allComments = getAllComments();
    
    if (allComments[photoId]) {
      allComments[photoId] = allComments[photoId].filter(
        comment => comment.id !== commentId
      );
      localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(allComments));
      return { success: true };
    }
    
    return { success: false, error: 'Photo not found' };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false, error: 'Failed to delete comment' };
  }
};

// Get comment count for a photo
export const getCommentCount = (photoId) => {
  const comments = getPhotoComments(photoId);
  return comments.length;
};

// Get average rating for a photo
export const getAverageRating = (photoId) => {
  const comments = getPhotoComments(photoId);
  if (comments.length === 0) return 0;
  
  const sum = comments.reduce((acc, comment) => acc + (comment.rating || 0), 0);
  return (sum / comments.length).toFixed(1);
};

// Get all comments across all photos (for admin view)
export const getAllCommentsFlat = () => {
  const allComments = getAllComments();
  const flatComments = [];
  
  Object.keys(allComments).forEach(photoId => {
    allComments[photoId].forEach(comment => {
      flatComments.push(comment);
    });
  });
  
  // Sort by date, newest first
  return flatComments.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
};
