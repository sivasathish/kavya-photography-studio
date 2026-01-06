// Gallery Page Component - Display all photos with category filter
import { useState, useEffect } from 'react';
import PhotoCard from '../components/PhotoCard';
import { getAllPhotos } from '../firebase/firestoreService';
import '../styles/Gallery.css';

// Sample photos data (fallback when Firebase is not configured or no images uploaded)
const SAMPLE_PHOTOS = [
  {
    id: '1',
    title: 'Beautiful Wedding Ceremony',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Elegant Bride Portrait',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Couple First Dance',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    createdAt: new Date()
  },
  {
    id: '4',
    title: 'Professional Headshot',
    category: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    createdAt: new Date()
  },
  {
    id: '5',
    title: 'Family Portrait Session',
    category: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
    createdAt: new Date()
  },
  {
    id: '6',
    title: 'Senior Portrait',
    category: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800',
    createdAt: new Date()
  },
  {
    id: '7',
    title: 'Corporate Event Coverage',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800',
    createdAt: new Date()
  },
  {
    id: '8',
    title: 'Birthday Celebration',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    createdAt: new Date()
  },
  {
    id: '9',
    title: 'Conference Photography',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    createdAt: new Date()
  },
  {
    id: '10',
    title: 'Studio Fashion Shoot',
    category: 'studio',
    imageUrl: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?w=800',
    createdAt: new Date()
  },
  {
    id: '11',
    title: 'Product Photography',
    category: 'studio',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    createdAt: new Date()
  },
  {
    id: '12',
    title: 'Beauty Portrait',
    category: 'studio',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    createdAt: new Date()
  }
];

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', 'wedding', 'portrait', 'event', 'studio'];

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    filterPhotos();
  }, [selectedCategory, photos]);

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch from Firestore
      const firestorePhotos = await getAllPhotos();
      
      if (firestorePhotos && firestorePhotos.length > 0) {
        setPhotos(firestorePhotos);
        setFilteredPhotos(firestorePhotos);
      } else {
        // Use sample photos if Firebase not configured or no images uploaded
        console.log('Using sample photos as fallback');
        setPhotos(SAMPLE_PHOTOS);
        setFilteredPhotos(SAMPLE_PHOTOS);
      }
    } catch (err) {
      console.error('Error fetching photos:', err);
      // Use sample photos as fallback instead of showing error
      console.log('Using sample photos due to error');
      setPhotos(SAMPLE_PHOTOS);
      setFilteredPhotos(SAMPLE_PHOTOS);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPhotos = () => {
    if (selectedCategory === 'All') {
      setFilteredPhotos(photos);
    } else {
      const filtered = photos.filter(
        photo => photo.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredPhotos(filtered);
    }
  };


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="gallery-page">
      {/* Gallery Header */}
      <section className="gallery-header">
        <div className="container">
          <h1 className="page-title">Our Gallery</h1>
          <p className="page-subtitle">
            Explore our collection of beautiful moments captured through the lens
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="gallery-filters">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="gallery-count">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'Photo' : 'Photos'}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-content">
        <div className="container">
          {isLoading ? (
            <div className="loading-container">
              <div className="spinner-large"></div>
              <p>Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <span className="error-icon">⚠️</span>
              <p className="error-message">{error}</p>
              <button onClick={fetchPhotos} className="btn btn-primary">
                Retry
              </button>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📷</span>
              <h3>No Photos Found</h3>
              <p>
                {selectedCategory === 'All' 
                  ? 'No photos available yet. Check back soon!' 
                  : `No photos found in the ${selectedCategory} category.`}
              </p>
              {selectedCategory !== 'All' && (
                <button 
                  onClick={() => setSelectedCategory('All')} 
                  className="btn btn-secondary"
                >
                  View All Photos
                </button>
              )}
            </div>
          ) : (
            <div className="gallery-grid">
              {filteredPhotos.map(photo => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      {!isLoading && !error && filteredPhotos.length > 0 && (
        <section className="gallery-cta">
          <div className="container">
            <div className="cta-box">
              <h2>Love What You See?</h2>
              <p>Book your photography session and let us create beautiful memories for you</p>
              <a href="/booking" className="btn btn-primary btn-large">
                Book a Session
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Gallery;
