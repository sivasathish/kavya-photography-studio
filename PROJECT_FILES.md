# Project File List - Kavya Photography Studio

## 📦 Complete Project Structure

### Root Configuration Files
```
├── package.json                    # Dependencies and scripts
├── vite.config.js                  # Vite configuration
├── .gitignore                      # Git ignore rules
├── netlify.toml                    # Netlify deployment config
├── .env.example                    # Environment template
├── index.html                      # HTML entry point
```

### Documentation Files
```
├── README.md                       # Project overview
├── SETUP_GUIDE.md                  # Complete setup instructions
├── QUICKSTART.md                   # Quick start guide
└── PROJECT_FILES.md                # This file
```

### Firebase Security Rules
```
├── firestore.rules                 # Firestore security rules
└── storage.rules                   # Storage security rules
```

### Source Code (src/)

#### Main Application Files
```
src/
├── main.jsx                        # Application entry point
├── App.jsx                         # Main app component with routing
```

#### Pages (src/pages/)
```
src/pages/
├── Home.jsx                        # Homepage with hero, services, latest photos
├── Gallery.jsx                     # Photo gallery with category filters
├── Booking.jsx                     # Booking request page
└── Contact.jsx                     # Contact information page
```

#### Components (src/components/)
```
src/components/
├── Navbar.jsx                      # Navigation header
├── Footer.jsx                      # Footer with links and social media
├── PhotoCard.jsx                   # Individual photo card component
└── BookingForm.jsx                 # Booking form with validation
```

#### Firebase Configuration (src/firebase/)
```
src/firebase/
├── firebaseConfig.js              # Firebase initialization
└── firestoreService.js            # All database operations (CRUD)
```

#### Styles (src/styles/)
```
src/styles/
├── index.css                       # Global styles, variables, reset
├── App.css                         # App layout styles
├── Navbar.css                      # Navigation styles
├── Footer.css                      # Footer styles
├── PhotoCard.css                   # Photo card styles
├── BookingForm.css                 # Form and alert styles
├── Home.css                        # Homepage styles
├── Gallery.css                     # Gallery page styles
├── Booking.css                     # Booking page styles
└── Contact.css                     # Contact page styles
```

## 📊 File Statistics

### Total Files: 28

**Configuration:** 6 files
**Documentation:** 4 files
**Security Rules:** 2 files
**React Components:** 10 files
**Firebase:** 2 files
**Styles:** 10 files

### Lines of Code (Approximate)
- **JavaScript/JSX:** ~2,500 lines
- **CSS:** ~2,000 lines
- **Documentation:** ~1,500 lines
- **Total:** ~6,000 lines

## 🎯 Key Files Explained

### Must Configure
1. **`.env`** (create from .env.example)
   - Contains Firebase credentials
   - Required for app to work

2. **`firestore.rules`**
   - Update admin email (line 14)
   - Deploy to Firebase Console

3. **`storage.rules`**
   - Update admin email (line 13)
   - Deploy to Firebase Console

### Entry Points
1. **`index.html`**
   - HTML shell
   - Loads React app

2. **`main.jsx`**
   - JavaScript entry
   - Mounts React app

3. **`App.jsx`**
   - Main component
   - Defines routes

### Core Functionality
1. **`firestoreService.js`**
   - All database operations
   - Photo and booking CRUD
   - Sample data generator

2. **`BookingForm.jsx`**
   - Form validation
   - Firestore integration
   - Success/error handling

3. **`Gallery.jsx`**
   - Photo display
   - Category filtering
   - Loading states

## 📝 File Dependencies

### Component Dependencies
```
App.jsx
├── Navbar.jsx
├── Footer.jsx
└── Pages
    ├── Home.jsx
    │   └── PhotoCard.jsx
    ├── Gallery.jsx
    │   └── PhotoCard.jsx
    ├── Booking.jsx
    │   └── BookingForm.jsx
    └── Contact.jsx
```

### Firebase Dependencies
```
firebaseConfig.js
└── firestoreService.js
    ├── Used by Home.jsx
    ├── Used by Gallery.jsx
    └── Used by BookingForm.jsx
```

### Style Dependencies
```
index.css (Global)
├── App.css
├── Navbar.css
├── Footer.css
├── PhotoCard.css
├── BookingForm.css
├── Home.css
├── Gallery.css
├── Booking.css
└── Contact.css
```

## 🔧 Files You'll Edit Most

### Regular Updates
1. **`src/pages/Home.jsx`**
   - Update hero text
   - Change statistics
   - Modify services

2. **`src/pages/Contact.jsx`**
   - Update contact info
   - Change social media links
   - Modify business hours

3. **`src/styles/*.css`**
   - Customize colors
   - Adjust spacing
   - Change fonts

### One-Time Configuration
1. **`.env`** - Firebase credentials
2. **`firestore.rules`** - Admin email
3. **`storage.rules`** - Admin email
4. **`package.json`** - Project name/version

### Rarely Modified
1. **`vite.config.js`** - Build settings
2. **`netlify.toml`** - Deployment config
3. **`firebaseConfig.js`** - Firebase init
4. **`.gitignore`** - Git rules

## 🚀 Build Output

When you run `npm run build`, creates:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [images]
```

## 📦 Package Dependencies

### Production Dependencies (4)
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "firebase": "^10.7.1"
}
```

### Development Dependencies (4)
```json
{
  "@types/react": "^18.2.43",
  "@types/react-dom": "^18.2.17",
  "@vitejs/plugin-react": "^4.2.1",
  "vite": "^5.0.8"
}
```

## 🎨 Color Scheme (CSS Variables)

Defined in `src/styles/index.css`:
```css
--primary-color: #2c3e50     /* Dark blue-gray */
--secondary-color: #e74c3c    /* Red */
--accent-color: #3498db       /* Light blue */
--success-color: #27ae60      /* Green */
--error-color: #e74c3c        /* Red */
```

## 📐 Breakpoints

Mobile-first responsive design:
- **Mobile:** < 480px
- **Tablet:** 480px - 768px
- **Desktop:** 768px - 968px
- **Large Desktop:** > 968px

## 🔍 Quick File Lookup

**Need to change...**

| What | File |
|------|------|
| Navigation links | `src/components/Navbar.jsx` |
| Footer content | `src/components/Footer.jsx` |
| Homepage hero | `src/pages/Home.jsx` |
| Gallery categories | `src/pages/Gallery.jsx` |
| Booking form fields | `src/components/BookingForm.jsx` |
| Contact details | `src/pages/Contact.jsx` |
| Colors/fonts | `src/styles/index.css` |
| Firebase config | `.env` |
| Security rules | `firestore.rules`, `storage.rules` |
| Deployment settings | `netlify.toml` |

---

**Last Updated:** December 29, 2025
