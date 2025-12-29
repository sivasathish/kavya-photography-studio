# Quick Start Guide - Kavya Photography Studio

## 🚀 Get Started in 10 Minutes

### Step 1: Install Dependencies (1 minute)
```bash
npm install
```

### Step 2: Set Up Firebase (5 minutes)

1. **Create Firebase Project:**
   - Go to https://console.firebase.google.com/
   - Click "Add Project" → Name it "kavya-photography-studio"
   - Create project

2. **Enable Services:**
   - Enable **Firestore Database** (Production mode)
   - Enable **Storage** (Production mode)
   - Enable **Authentication** (Email/Password)

3. **Get Configuration:**
   - Click Settings ⚙️ → Project Settings
   - Scroll to "Your apps" → Click Web icon `</>`
   - Copy the configuration object

### Step 3: Configure Environment (1 minute)

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your Firebase config:**
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

### Step 4: Set Security Rules (2 minutes)

1. **Firestore Rules:**
   - Firebase Console → Firestore Database → Rules tab
   - Copy content from `firestore.rules` file
   - **Update admin email on line 14**
   - Click "Publish"

2. **Storage Rules:**
   - Firebase Console → Storage → Rules tab
   - Copy content from `storage.rules` file
   - **Update admin email on line 13**
   - Click "Publish"

### Step 5: Run Development Server (1 minute)
```bash
npm run dev
```

**Open browser:** http://localhost:3000

## ✅ You're Done!

Your photography website is now running locally!

## 📝 Next Steps

### Add Sample Photos
1. Go to Firebase Console → Firestore Database
2. Click "Start collection" → Name it **"photos"**
3. Add a document:
   ```
   title: "Beautiful Wedding"
   category: "Wedding"
   imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
   createdAt: (click "Add field" → select "timestamp" → now)
   ```

### Test Booking Form
1. Go to http://localhost:3000/booking
2. Fill out the form
3. Check Firebase Console → Firestore → bookings collection

### Deploy to Netlify (Optional)
1. Push code to GitHub
2. Connect repository to Netlify
3. Add same environment variables
4. Deploy! 🚀

## 🆘 Having Issues?

### Firebase Connection Error
- Double-check `.env` values match Firebase Console
- Ensure there are no typos in variable names
- Restart dev server: `Ctrl+C` then `npm run dev`

### Photos Not Showing
- Check browser console (F12) for errors
- Verify Firestore rules are published
- Make sure collection name is exactly "photos"

### Booking Form Not Working
- Check Firestore rules are published
- Verify collection name is exactly "bookings"
- Check browser console for errors

## 📚 Full Documentation

For complete setup instructions, see:
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Comprehensive guide
- **[README.md](./README.md)** - Project overview

## 🎯 Project Structure Overview

```
src/
├── pages/              → Home, Gallery, Booking, Contact
├── components/         → Navbar, Footer, PhotoCard, BookingForm
├── firebase/          → firebaseConfig, firestoreService
└── styles/            → All CSS files

Root files:
├── firestore.rules    → Database security
├── storage.rules      → Storage security
├── netlify.toml       → Deployment config
└── .env              → Your Firebase credentials
```

## 💡 Tips

1. **Use Unsplash URLs** for sample images (free CDN)
2. **Check Firebase Usage** dashboard to stay within free tier
3. **Enable Browser Console** (F12) to see helpful errors
4. **Read SETUP_GUIDE.md** for Android app integration

---

**Need Help?** Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions!

**Built with ❤️ for Kavya Photography and Studio**
