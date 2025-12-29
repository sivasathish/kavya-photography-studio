// Home Page Component
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestPhotos } from '../firebase/firestoreService';
import PhotoCard from '../components/PhotoCard';
import '../styles/Home.css';

// Sample photos for demo (fallback when Firebase is not configured)
const SAMPLE_LATEST_PHOTOS = [
  {
    id: '1',
    title: 'Beautiful Wedding Ceremony',
    category: 'Wedding',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'
  },
  {
    id: '2',
    title: 'Elegant Bride Portrait',
    category: 'Wedding',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800'
  },
  {
    id: '3',
    title: 'Professional Headshot',
    category: 'Portrait',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
  },
  {
    id: '4',
    title: 'Family Portrait',
    category: 'Portrait',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800'
  },
  {
    id: '5',
    title: 'Corporate Event',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800'
  },
  {
    id: '6',
    title: 'Studio Fashion',
    category: 'Studio',
    imageUrl: 'https://images.unsplash.com/photo-1492681290082-e932832941e6?w=800'
  }
];

const Home = () => {
  const [latestPhotos, setLatestPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestPhotos();
  }, []);

  const fetchLatestPhotos = async () => {
    try {
      setIsLoading(true);
      
      // Try to fetch from Firebase
      try {
        const photos = await getLatestPhotos(6);
        if (photos && photos.length > 0) {
          setLatestPhotos(photos);
        } else {
          // Use sample photos if no photos in Firebase
          setLatestPhotos(SAMPLE_LATEST_PHOTOS);
        }
      } catch (firebaseError) {
        // If Firebase not configured, use sample photos
        console.log('Using sample photos (Firebase not configured)');
        setLatestPhotos(SAMPLE_LATEST_PHOTOS);
      }
    } catch (err) {
      console.error('Error fetching latest photos:', err);
      setError('Failed to load photos. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Kavya Photography and Studio
          </h1>
          <p className="hero-subtitle">
            Capturing Life's Most Precious Moments
          </p>
          <p className="hero-description">
            Professional photography services for weddings, portraits, events, and studio sessions
          </p>
          <div className="hero-buttons">
            <Link to="/booking" className="btn btn-primary btn-large">
              Book a Session
            </Link>
            <Link to="/gallery" className="btn btn-secondary btn-large">
              View Gallery
            </Link>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Welcome to Kavya Photography</h2>
              <p className="lead">
                Where Every Moment Becomes a Timeless Memory
              </p>
              <p>
                At Kavya Photography and Studio, we believe that every moment tells a story. 
                With years of experience and a passion for capturing authentic emotions, we 
                specialize in creating stunning visual narratives that you'll cherish forever.
              </p>
              <p>
                Whether it's the joy of your wedding day, the warmth of family portraits, 
                or the excitement of special events, our team is dedicated to preserving 
                your precious memories with creativity and professionalism.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Events Covered</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600" 
                alt="Professional photographer with camera"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Professional photography services tailored to your needs
          </p>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">💒</div>
              <h3>Wedding Photography</h3>
              <p>
                Capture every precious moment of your special day with our 
                comprehensive wedding photography packages.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">👤</div>
              <h3>Portrait Sessions</h3>
              <p>
                Professional headshots, family portraits, and personal photo 
                sessions that reflect your unique personality.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🎉</div>
              <h3>Event Coverage</h3>
              <p>
                From corporate events to birthday celebrations, we document 
                your special occasions with style and creativity.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">📸</div>
              <h3>Studio Photography</h3>
              <p>
                Professional studio sessions for product photography, fashion 
                shoots, and commercial projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Photos Section */}
      <section className="latest-photos-section">
        <div className="container">
          <h2 className="section-title">Latest Work</h2>
          <p className="section-subtitle">
            Explore our recent photography projects
          </p>

          {isLoading ? (
            <div className="loading-container">
              <div className="spinner-large"></div>
              <p>Loading photos...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button onClick={fetchLatestPhotos} className="btn btn-secondary">
                Try Again
              </button>
            </div>
          ) : latestPhotos.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📷</span>
              <p>No photos available yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="photos-grid">
                {latestPhotos.map(photo => (
                  <PhotoCard key={photo.id} photo={photo} />
                ))}
              </div>
              <div className="section-cta">
                <Link to="/gallery" className="btn btn-primary">
                  View Full Gallery
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create Beautiful Memories?</h2>
            <p>
              Let's work together to capture your special moments. 
              Book a session today and experience professional photography at its best.
            </p>
            <Link to="/booking" className="btn btn-light btn-large">
              Book Your Session Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
