// Main Entry Point
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

// Clear old localStorage data (migration from localStorage to Firebase)
const oldKeys = ['kavya_gallery_images', 'kavya_comments', 'kavya_bookings'];
oldKeys.forEach(key => {
  if (localStorage.getItem(key)) {
    console.log(`Clearing old data: ${key}`);
    localStorage.removeItem(key);
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
