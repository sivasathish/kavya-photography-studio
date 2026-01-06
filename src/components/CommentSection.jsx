import { useState, useEffect } from 'react';
import { getPhotoComments, addComment, getAverageRating, getCommentCount } from '../utils/comments';
import '../styles/CommentSection.css';

function CommentSection({ photoId, photoTitle }) {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    rating: 5
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    loadComments();
  }, [photoId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const photoComments = await getPhotoComments(photoId);
      setComments(photoComments);
      setCommentCount(photoComments.length);
      
      // Calculate average rating
      if (photoComments.length > 0) {
        const sum = photoComments.reduce((acc, comment) => acc + (comment.rating || 0), 0);
        setAvgRating(parseFloat((sum / photoComments.length).toFixed(1)));
      } else {
        setAvgRating(0);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.comment.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    
    try {
      const result = await addComment(photoId, formData);
      
      if (result.success) {
        setFormData({ name: '', email: '', comment: '', rating: 5 });
        setShowForm(false);
        await loadComments();
        alert('Thank you for your review!');
      } else {
        alert('Failed to add comment. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    // Handle Firestore Timestamp or ISO string
    let date;
    if (dateString && typeof dateString === 'object' && dateString.toDate) {
      // Firestore Timestamp
      date = dateString.toDate();
    } else {
      // ISO string or Date object
      date = new Date(dateString);
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= rating ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="comment-section">
      <div className="comment-header">
        <h3>Reviews & Comments</h3>
        <div className="comment-stats">
          {commentCount > 0 && (
            <>
              <span className="avg-rating">
                {renderStars(Math.round(avgRating))}
                <span className="rating-number">{avgRating}</span>
              </span>
              <span className="comment-count">({commentCount} reviews)</span>
            </>
          )}
        </div>
      </div>

      <button 
        className="add-review-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : '✍️ Write a Review'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email (Optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>Rating *</label>
            <div className="star-input">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${star <= formData.rating ? 'active' : ''}`}
                  onClick={() => setFormData({...formData, rating: star})}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Your Review *</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              placeholder="Share your thoughts about this photo..."
              rows="4"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      <div className="comments-list">
        {loading ? (
          <p className="loading-comments">Loading reviews...</p>
        ) : comments.length === 0 ? (
          <p className="no-comments">No reviews yet. Be the first to review!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header-info">
                <div className="comment-author">
                  <strong>{comment.name}</strong>
                  {renderStars(comment.rating)}
                </div>
                <span className="comment-date">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="comment-text">{comment.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
