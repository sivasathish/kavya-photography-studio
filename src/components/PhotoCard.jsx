// PhotoCard Component - Display individual photo with category and comments
import { useState } from 'react';
import { getCommentCount, getAverageRating } from '../utils/comments';
import CommentSection from './CommentSection';
import '../styles/PhotoCard.css';

const PhotoCard = ({ photo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const commentCount = getCommentCount(photo.id);
  const avgRating = getAverageRating(photo.id);

  const renderStars = (rating) => {
    return (
      <div className="card-star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= Math.round(rating) ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="photo-card">
        {isLoading && (
          <div className="photo-card-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        
        {hasError ? (
          <div className="photo-card-error">
            <span>📷</span>
            <p>Image unavailable</p>
          </div>
        ) : (
          <>
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className={`photo-card-image ${isLoading ? 'loading' : 'loaded'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
            <div className="photo-card-overlay">
              <h3 className="photo-card-title">{photo.title}</h3>
              <span className="photo-card-category">{photo.category}</span>
              
              {commentCount > 0 && (
                <div className="photo-card-rating">
                  {renderStars(avgRating)}
                  <span className="rating-text">{avgRating} ({commentCount})</span>
                </div>
              )}
              
              <button 
                className="view-comments-btn"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments ? '✕ Close' : `💬 ${commentCount > 0 ? `${commentCount} Reviews` : 'Add Review'}`}
              </button>
            </div>
          </>
        )}
      </div>
      
      {showComments && !hasError && (
        <div className="photo-comments-modal">
          <div className="modal-content">
            <button 
              className="modal-close"
              onClick={() => setShowComments(false)}
            >
              ✕
            </button>
            <div className="modal-image-preview">
              <img src={photo.imageUrl} alt={photo.title} />
              <h2>{photo.title}</h2>
            </div>
            <CommentSection photoId={photo.id} photoTitle={photo.title} />
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCard;
