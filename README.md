# Kavya Photography and Studio

**Professional Photography Website Built with React + Firebase**

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

A modern, full-featured photography studio website with real-time booking system, gallery management, and mobile-first responsive design. Built entirely on **FREE tier services**.

## ✨ Features

### 🎨 User Features
- **Stunning Hero Section** - Eye-catching photography-focused landing page
- **Dynamic Gallery** - Browse photos with category filtering (Wedding, Portrait, Events, Studio)
- **Easy Booking System** - Simple form to request photography sessions
- **Contact Information** - Studio address, phone, email, and social media links
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Fast Loading** - Optimized images with lazy loading

### 🔧 Technical Features
- **React 18** with Vite for blazing-fast development
- **Firebase Firestore** - Real-time NoSQL database
- **Firebase Storage** - Scalable image hosting
- **Firebase Authentication** - Secure admin access
- **React Router** - Seamless page navigation
- **Production-Ready** - Security rules, error handling, loading states
- **Android Compatible** - Same database works with future mobile app

## 🏗️ Architecture

```
┌─────────────────┐
│   React Web App │ ◄─── You are here
│   (Netlify)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Cloud Firestore│ ◄─── Shared Database
│  (Firebase)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Android App    │ ◄─── Future Integration
│  (Play Store)   │
└─────────────────┘
```

## 📁 Project Structure

```
KavyaStudio/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PhotoCard.jsx
│   │   └── BookingForm.jsx
│   │
│   ├── pages/              # Main pages
│   │   ├── Home.jsx
│   │   ├── Gallery.jsx
│   │   ├── Booking.jsx
│   │   └── Contact.jsx
│   │
│   ├── firebase/           # Firebase configuration
│   │   ├── firebaseConfig.js
│   │   └── firestoreService.js
│   │
│   ├── styles/             # CSS files
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── Navbar.css
│   │   ├── Footer.css
│   │   ├── PhotoCard.css
│   │   ├── BookingForm.css
│   │   ├── Home.css
│   │   ├── Gallery.css
│   │   ├── Booking.css
│   │   └── Contact.css
│   │
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
│
├── firestore.rules         # Firestore security rules
├── storage.rules           # Storage security rules
├── netlify.toml            # Netlify configuration
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
├── .env.example            # Environment template
├── SETUP_GUIDE.md          # Complete setup instructions
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- Firebase account ([Sign up](https://firebase.google.com/))
- Netlify account ([Sign up](https://netlify.com/))

### Installation

1. **Clone the repository:**
   ```bash
   cd /home/siva/Projects/KavyaStudio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Follow the comprehensive [SETUP_GUIDE.md](./SETUP_GUIDE.md)
   - Create Firebase project
   - Enable Firestore, Storage, and Authentication
   - Copy configuration

4. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase credentials
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Open browser:**
   ```
   http://localhost:3000
   ```

## 📚 Documentation

- **[Complete Setup Guide](./SETUP_GUIDE.md)** - Step-by-step Firebase & Netlify setup
- **[Firebase Security Rules](./firestore.rules)** - Production-safe access control
- **[Storage Security Rules](./storage.rules)** - Image upload security

## 🎯 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router 6.21.0** - Client-side routing
- **Vite 5.0** - Build tool and dev server

### Backend
- **Firebase Firestore** - NoSQL database
- **Firebase Storage** - Image hosting
- **Firebase Authentication** - Admin access

### Deployment
- **Netlify** - Static site hosting (FREE)
- **GitHub/GitLab** - Version control

## 🗄️ Database Schema

### Photos Collection
```javascript
{
  id: string,              // Auto-generated
  title: string,           // "Beautiful Wedding Ceremony"
  category: string,        // "Wedding" | "Portrait" | "Events" | "Studio"
  imageUrl: string,        // "https://..."
  createdAt: Timestamp     // Firestore server timestamp
}
```

### Bookings Collection
```javascript
{
  id: string,              // Auto-generated
  name: string,            // "John Doe"
  phone: string,           // "1234567890"
  email: string,           // "john@example.com"
  eventType: string,       // "Wedding", "Portrait", etc.
  date: string,            // "2025-02-15"
  message: string,         // Optional message
  createdAt: Timestamp,    // Firestore server timestamp
  status: string           // "pending"
}
```

## 🔐 Security

### Authentication
- Email/Password authentication for admins
- Public read access for photos
- Public write access for bookings only
- Admin-only access for managing photos and viewing bookings

### Security Rules
Production-safe Firestore and Storage rules included:
- ✅ Public users can read photos
- ✅ Public users can create bookings
- ❌ Public users cannot read other bookings
- ✅ Admins have full access
- ✅ File size limits (10MB max)
- ✅ Image-only uploads

## 📱 Android Integration (Future)

The database structure is designed to work seamlessly with a future Android app:

1. ✅ Same Firestore collections
2. ✅ Same security rules
3. ✅ Compatible data models
4. ✅ Real-time synchronization

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#android-app-integration) for Android implementation details.

## 💰 Cost & Free Tier

### Firebase Spark Plan (FREE)
- **Firestore:** 1 GB storage, 50K reads/day, 20K writes/day
- **Storage:** 5 GB storage, 1 GB downloads/day
- **Authentication:** Unlimited

### Netlify Free Tier
- **Bandwidth:** 100 GB/month
- **Build Minutes:** 300 minutes/month
- **Sites:** Unlimited
- **SSL:** Free automatic HTTPS

**This website can handle thousands of visitors per month on the FREE tier!**

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Deployment

### Deploy to Netlify

1. **Push to Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add environment variables in Netlify:**
   - Go to Site settings → Environment variables
   - Add all `VITE_FIREBASE_*` variables

4. **Deploy!** 🎉

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#netlify-deployment) for detailed instructions.

## 📸 Adding Photos

### Method 1: Firebase Console (Recommended)
1. Go to Firebase Console → Firestore
2. Select "photos" collection
3. Add document with fields: title, category, imageUrl, createdAt

### Method 2: Admin Panel (Future Enhancement)
Build a custom admin dashboard with photo upload functionality.

## 🐛 Troubleshooting

### Common Issues

**1. Firebase not loading:**
- Check `.env` file has correct credentials
- Verify Firebase project is active
- Check browser console for errors

**2. Images not displaying:**
- Verify image URLs are accessible
- Check Storage security rules
- Ensure images are uploaded to Firebase Storage

**3. Booking form not working:**
- Check Firestore security rules
- Verify network tab for API errors
- Ensure collection name is exactly "bookings"

**4. Build fails on Netlify:**
- Verify all environment variables are set
- Check Node version (should be 18+)
- Review build logs for specific errors

## 🤝 Contributing

This is a custom project for Kavya Photography and Studio. For modifications:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and built specifically for **Kavya Photography and Studio**.

## 🙏 Acknowledgments

- **Unsplash** - Sample photography images
- **Firebase** - Backend infrastructure
- **Netlify** - Hosting platform
- **React** - UI framework
- **Vite** - Build tool

## 📞 Support

For questions or issues:
- 📧 Email: info@kavyaphotography.com
- 💬 WhatsApp: +91 123-456-7890
- 📘 Facebook: /kavyaphotography
- 📷 Instagram: @kavyaphotography

---

**Made with ❤️ for capturing beautiful memories**

*Last updated: December 29, 2025*
