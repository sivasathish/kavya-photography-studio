// PhotoCard Component - Display individual photo with category
import { useState } from 'react';
import '../styles/PhotoCard.css';

const PhotoCard = ({ photo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
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
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoCard;
