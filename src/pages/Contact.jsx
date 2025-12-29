// Contact Page Component
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Contact Header */}
      <section className="contact-header">
        <div className="container">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            We'd love to hear from you. Reach out for inquiries, bookings, or just to say hello!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Kavya Photography and Studio</h2>
              <p className="contact-intro">
                Whether you have questions about our services, want to discuss your photography 
                needs, or ready to book a session, we're here to help!
              </p>

              <div className="contact-info-cards">
                <div className="contact-card">
                  <div className="contact-icon">📍</div>
                  <h3>Visit Us</h3>
                  <p>
                    Chinnapanaiyur<br />
                    Neithalur South<br />
                    Nangavaram (VIA)<br />
                    Kulithalai (TK), KARUR (DT)
                  </p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">📞</div>
                  <h3>Call Us</h3>
                  <p>
                    <a href="tel:+919003698316">+91 90036 98316</a>
                  </p>
                  <p className="contact-hours">
                    Mon-Sat: 9:00 AM - 7:00 PM<br />
                    Sun: By Appointment
                  </p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">✉️</div>
                  <h3>Email Us</h3>
                  <p>
                    <a href="mailto:Kaviyamobiles81@gmail.com">
                      Kaviyamobiles81@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="social-section">
                <h3>Connect With Us</h3>
                <p>Follow us on social media for latest updates and photography inspiration</p>
                <div className="social-links-large">
                  <a 
                    href="https://www.facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link facebook"
                  >
                    <span className="social-icon">📘</span>
                    <span className="social-name">Facebook</span>
                  </a>
                  <a 
                    href="https://www.instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link instagram"
                  >
                    <span className="social-icon">📷</span>
                    <span className="social-name">Instagram</span>
                  </a>
                  <a 
                    href="https://wa.me/919003698316" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link whatsapp"
                  >
                    <span className="social-icon">💬</span>
                    <span className="social-name">WhatsApp</span>
                  </a>
                  <a 
                    href="https://www.youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link youtube"
                  >
                    <span className="social-icon">📹</span>
                    <span className="social-name">YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="contact-actions">
              <div className="action-card primary">
                <h3>Ready to Book?</h3>
                <p>
                  Start your photography journey with us. Book a session and 
                  let's create beautiful memories together.
                </p>
                <a href="/booking" className="btn btn-light btn-block">
                  Book a Session
                </a>
              </div>

              <div className="action-card secondary">
                <h3>Chat on WhatsApp</h3>
                <p>
                  Get instant responses to your questions. Chat with us 
                  directly on WhatsApp.
                </p>
                <a 
                  href="https://wa.me/919003698316?text=Hi%20Kavya%20Photography!%20I'm%20interested%20in%20your%20services." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-block"
                >
                  💬 Start Chat
                </a>
              </div>

              <div className="action-card">
                <h3>View Our Work</h3>
                <p>
                  Explore our portfolio to see the quality and style of our photography.
                </p>
                <a href="/gallery" className="btn btn-outline btn-block">
                  Visit Gallery
                </a>
              </div>

              {/* Business Hours */}
              <div className="business-hours-card">
                <h3>Business Hours</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span className="day">Monday - Friday</span>
                    <span className="time">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="day">Saturday</span>
                    <span className="time">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span className="day">Sunday</span>
                    <span className="time">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Find Us</h2>
          <div className="map-placeholder">
            <div className="map-icon">🗺️</div>
            <p>Chinnapanaiyur, Neithalur South, Kulithalai, Karur</p>
            <a 
              href="https://maps.google.com/?q=Chinnapanaiyur+Neithalur+South+Kulithalai+Karur" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
