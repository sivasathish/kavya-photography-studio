// Navbar Component - Navigation header
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">📷</span>
          <span className="logo-text">Kavya Photography</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/')}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/gallery" 
            className={`navbar-link ${isActive('/gallery')}`}
            onClick={closeMenu}
          >
            Gallery
          </Link>
          <Link 
            to="/booking" 
            className={`navbar-link ${isActive('/booking')}`}
            onClick={closeMenu}
          >
            Book Session
          </Link>
          <Link 
            to="/contact" 
            className={`navbar-link ${isActive('/contact')}`}
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>

        <button 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
