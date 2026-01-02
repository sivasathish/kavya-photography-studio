// Home Page Component
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PhotoCard from '../components/PhotoCard';
import '../styles/Home.css';

const IMAGES_STORAGE_KEY = 'kavya_gallery_images';

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
      
      // Fetch from localStorage
      const storedImages = localStorage.getItem(IMAGES_STORAGE_KEY);
      if (storedImages) {
        const allImages = JSON.parse(storedImages);
        // Filter only outdoor category images
        const outdoorImages = allImages.filter(img => img.category === 'outdoor');
        
        if (outdoorImages.length > 0) {
          // Get the 6 most recent outdoor images
          const recentOutdoor = outdoorImages.slice(0, 6);
          setLatestPhotos(recentOutdoor);
        } else {
          // No outdoor images found
          setLatestPhotos([]);
        }
      } else {
        // No images in localStorage
        setLatestPhotos([]);
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
            Kaviya Photography and Studio
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
              <h2>Welcome to Kaviya Photography</h2>
              <p className="lead">
                Where Every Moment Becomes a Timeless Memory
              </p>
              <p>
                At Kaviya Photography and Studio, we believe that every moment tells a story. 
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
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">7000+</span>
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
              <p>No outdoor photos available yet. Upload outdoor category images from admin dashboard!</p>
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
