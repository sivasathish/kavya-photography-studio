import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../utils/auth';
import { getAllCommentsFlat, deleteComment, getCommentCount } from '../utils/comments';
import { getBookings, deleteBooking, updateBookingStatus, getBookingStats } from '../utils/bookings';
import '../styles/AdminDashboard.css';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const IMAGES_STORAGE_KEY = 'kavya_gallery_images';

function AdminDashboard() {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageData, setImageData] = useState({
    title: '',
    category: 'wedding',
    description: ''
  });
  const [allComments, setAllComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [bookingStats, setBookingStats] = useState({ total: 0, pending: 0, confirmed: 0, cancelled: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
    fetchComments();
    fetchBookings();
  }, []);

  const fetchImages = () => {
    try {
      const storedImages = localStorage.getItem(IMAGES_STORAGE_KEY);
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  const fetchComments = () => {
    const comments = getAllCommentsFlat();
    setAllComments(comments);
  };

  const fetchBookings = () => {
    const allBookings = getBookings();
    setBookings(allBookings);
    setBookingStats(getBookingStats());
  };

  const saveImagesToStorage = (imageList) => {
    localStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(imageList));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    if (!imageData.title.trim()) {
      alert('Please enter an image title');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'kaviya_gallery');

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const currentUser = getCurrentUser();

      const newImage = {
        id: Date.now().toString(),
        title: imageData.title,
        category: imageData.category,
        description: imageData.description,
        imageUrl: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
        uploadedAt: new Date().toISOString(),
        uploadedBy: currentUser?.username || 'admin'
      };

      const updatedImages = [newImage, ...images];
      saveImagesToStorage(updatedImages);
      setImages(updatedImages);

      setSelectedFile(null);
      setPreviewUrl(null);
      setImageData({ title: '', category: 'wedding', description: '' });
      document.getElementById('file-input').value = '';
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (image) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const updatedImages = images.filter(img => img.id !== image.id);
      saveImagesToStorage(updatedImages);
      setImages(updatedImages);
      
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting image. Please try again.');
    }
  };

  const handleDeleteComment = (photoId, commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    const result = deleteComment(photoId, commentId);
    if (result.success) {
      fetchComments();
      alert('Comment deleted successfully!');
    } else {
      alert('Failed to delete comment.');
    }
  };

  const handleDeleteBooking = (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    const result = deleteBooking(bookingId);
    if (result.success) {
      fetchBookings();
      alert('Booking deleted successfully!');
    } else {
      alert('Failed to delete booking.');
    }
  };

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    const result = updateBookingStatus(bookingId, newStatus);
    if (result.success) {
      fetchBookings();
      alert(`Booking status updated to ${newStatus}!`);
    } else {
      alert('Failed to update booking status.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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
      <div className="star-display">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= rating ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const getPhotoTitle = (photoId) => {
    const photo = images.find(img => img.id === photoId);
    return photo ? photo.title : 'Unknown Photo';
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const currentUser = getCurrentUser();

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <span className="admin-email">{currentUser?.username || 'Admin'}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="upload-section">
          <h2>Upload New Image</h2>
          <form onSubmit={handleUpload} className="upload-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="file-input">Select Image *</label>
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  onChange={handleFileSelect}
                  required
                />
                {selectedFile && (
                  <p className="file-name">Selected: {selectedFile.name}</p>
                )}
                {previewUrl && (
                  <div className="image-preview">
                    <img src={previewUrl} alt="Preview" style={{maxWidth: '200px', marginTop: '10px'}} />
                  </div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  value={imageData.title}
                  onChange={(e) => setImageData({...imageData, title: e.target.value})}
                  placeholder="Enter image title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  value={imageData.category}
                  onChange={(e) => setImageData({...imageData, category: e.target.value})}
                >
                  <option value="wedding">Wedding</option>
                  <option value="portrait">Portrait</option>
                  <option value="event">Event</option>
                  <option value="studio">Studio</option>
                  <option value="outdoor">Outdoor</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description (Optional)</label>
              <textarea
                id="description"
                value={imageData.description}
                onChange={(e) => setImageData({...imageData, description: e.target.value})}
                placeholder="Enter image description"
                rows="3"
              />
            </div>

            <button type="submit" className="upload-btn" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>
        </section>

        <section className="gallery-section">
          <h2>Manage Gallery ({images.length} images)</h2>
          
          {loading ? (
            <p className="loading-text">Loading images...</p>
          ) : images.length === 0 ? (
            <p className="empty-text">No images uploaded yet</p>
          ) : (
            <div className="gallery-grid">
              {images.map((image) => (
                <div key={image.id} className="gallery-item">
                  <img src={image.imageUrl} alt={image.title} />
                  <div className="image-info">
                    <h3>{image.title}</h3>
                    <span className="category-badge">{image.category}</span>
                    {image.description && <p>{image.description}</p>}
                    <div className="image-stats">
                      <span>�� {getCommentCount(image.id)} reviews</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(image)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bookings-management-section">
          <div className="section-header">
            <h2>Booking Requests ({bookingStats.total})</h2>
            <div className="booking-stats">
              <span className="stat pending">Pending: {bookingStats.pending}</span>
              <span className="stat confirmed">Confirmed: {bookingStats.confirmed}</span>
              <span className="stat cancelled">Cancelled: {bookingStats.cancelled}</span>
            </div>
            <button
              className="toggle-btn"
              onClick={() => setShowBookings(!showBookings)}
            >
              {showBookings ? 'Hide Bookings' : 'Show Bookings'}
            </button>
          </div>

          {showBookings && (
            <div className="bookings-list-admin">
              {bookings.length === 0 ? (
                <p className="empty-text">No booking requests yet</p>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className={`booking-card status-${booking.status}`}>
                    <div className="booking-header">
                      <div className="booking-info">
                        <h3>{booking.name}</h3>
                        <span className={`status-badge ${booking.status}`}>{booking.status.toUpperCase()}</span>
                      </div>
                      <div className="booking-meta">
                        <span className="booking-date">{formatDate(booking.createdAt)}</span>
                      </div>
                    </div>
                    <div className="booking-details">
                      <p><strong>📞 Phone:</strong> {booking.phone}</p>
                      <p><strong>✉️ Email:</strong> {booking.email}</p>
                      <p><strong>🎉 Event Type:</strong> {booking.eventType}</p>
                      <p><strong>📅 Preferred Date:</strong> {new Date(booking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      {booking.message && (
                        <p><strong>💬 Message:</strong> {booking.message}</p>
                      )}
                    </div>
                    <div className="booking-actions">
                      <select
                        value={booking.status}
                        onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="delete-booking-btn"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        <section className="comments-management-section">
          <div className="section-header">
            <h2>User Reviews & Comments ({allComments.length})</h2>
            <button 
              className="toggle-btn"
              onClick={() => setShowComments(!showComments)}
            >
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
          </div>

          {showComments && (
            <div className="comments-list-admin">
              {allComments.length === 0 ? (
                <p className="empty-text">No comments yet</p>
              ) : (
                allComments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <div className="comment-header">
                      <div className="comment-info">
                        <strong>{comment.name}</strong>
                        {renderStars(comment.rating)}
                        <span className="comment-photo-title">
                          on "{getPhotoTitle(comment.photoId)}"
                        </span>
                      </div>
                      <div className="comment-meta">
                        <span className="comment-date">{formatDate(comment.createdAt)}</span>
                        <button 
                          onClick={() => handleDeleteComment(comment.photoId, comment.id)}
                          className="delete-comment-btn"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                    <p className="comment-text">{comment.comment}</p>
                    {comment.email && (
                      <span className="comment-email">✉️ {comment.email}</span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
