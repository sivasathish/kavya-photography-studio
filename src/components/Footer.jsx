// Footer Component
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Kavya Photography and Studio</h3>
            <p>Capturing your precious moments with passion and creativity</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/booking">Book Session</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Wedding Photography</li>
              <li>Portrait Sessions</li>
              <li>Event Coverage</li>
              <li>Studio Photography</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                📘
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                📷
              </a>
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                💬
              </a>
              <a 
                href="mailto:info@kavyaphotography.com"
                aria-label="Email"
              >
                ✉️
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Kavya Photography and Studio. All rights reserved.</p>
          <p>Made with ❤️ for capturing beautiful memories</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
