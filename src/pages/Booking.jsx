// Booking Page Component
import BookingForm from '../components/BookingForm';
import '../styles/Booking.css';

const Booking = () => {
  return (
    <div className="booking-page">
      {/* Booking Header */}
      <section className="booking-header">
        <div className="container">
          <h1 className="page-title">Book Your Session</h1>
          <p className="page-subtitle">
            Let's capture your special moments together. Fill out the form below to book your photography session.
          </p>
        </div>
      </section>

      {/* Booking Content */}
      <section className="booking-content">
        <div className="container">
          <div className="booking-layout">
            {/* Booking Information */}
            <div className="booking-info">
              <div className="info-card">
                <div className="info-icon">📅</div>
                <h3>Flexible Scheduling</h3>
                <p>
                  We work around your schedule. Choose a date that works best for you, 
                  and we'll confirm availability within 24 hours.
                </p>
              </div>

              <div className="info-card">
                <div className="info-icon">💰</div>
                <h3>Transparent Pricing</h3>
                <p>
                  After receiving your booking request, we'll provide detailed pricing 
                  information based on your specific requirements.
                </p>
              </div>

              <div className="info-card">
                <div className="info-icon">📸</div>
                <h3>Professional Service</h3>
                <p>
                  Our experienced photographers use state-of-the-art equipment to 
                  deliver stunning, high-quality images.
                </p>
              </div>

              <div className="info-card">
                <div className="info-icon">⚡</div>
                <h3>Quick Turnaround</h3>
                <p>
                  Receive your professionally edited photos within 2-3 weeks, 
                  with preview images available sooner.
                </p>
              </div>

              <div className="booking-help">
                <h3>Need Help?</h3>
                <p>Have questions about our services or booking process?</p>
                <div className="help-buttons">
                  <a href="/contact" className="btn btn-outline">
                    Contact Us
                  </a>
                  <a 
                    href="https://wa.me/1234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="booking-form-container">
              <div className="form-header">
                <h2>Request a Session</h2>
                <p>Fill in your details and we'll get back to you shortly</p>
              </div>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="booking-process">
        <div className="container">
          <h2 className="section-title">What Happens Next?</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Submit Request</h3>
              <p>Fill out the booking form with your requirements</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Confirmation Call</h3>
              <p>We'll contact you within 24 hours to discuss details</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Schedule Session</h3>
              <p>Confirm date, time, and location for your shoot</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Capture Memories</h3>
              <p>Enjoy your professional photography session</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
