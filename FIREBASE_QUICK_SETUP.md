# Firebase Quick Setup for Reviews & Ratings

## Current Status
✅ Code migration complete - reviews now use Firebase
⚠️ Firebase not configured - using sample data as fallback

## Quick Setup (5 minutes)

### Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create new one)
3. Click ⚙️ Settings → Project settings
4. Scroll to "Your apps" section
5. Click the web icon (</>) to add a web app
6. Copy the configuration values

### Step 2: Update .env File

Open `/home/siva/Projects/KavyaStudio/.env` and uncomment/update these lines:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 3: Configure Firestore

1. In Firebase Console → Build → Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it next)
4. Select your region
5. Click "Enable"

### Step 4: Update Security Rules

1. In Firestore Database, click "Rules" tab
2. Replace with this content:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Photos - everyone can read, only admins can write
    match /photos/{photoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Comments - everyone can read and create, only admins can delete
    match /comments/{commentId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    // Bookings
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

### Step 5: Add Sample Data

In Firestore Database → Data tab:

**Add Collection: "photos"**

Add these documents (click "Add document"):

Document 1:
```
Document ID: (auto)
Fields:
  title: "Beautiful Wedding Ceremony"
  category: "wedding"
  imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
  createdAt: [Click "timestamp" type, then "now"]
```

Document 2:
```
Document ID: (auto)
Fields:
  title: "Elegant Bride Portrait"
  category: "wedding"
  imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800"
  createdAt: [Click "timestamp" type, then "now"]
```

Document 3:
```
Document ID: (auto)
Fields:
  title: "Professional Headshot"
  category: "portrait"
  imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
  createdAt: [Click "timestamp" type, then "now"]
```

### Step 6: Restart Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Testing

1. **Check Gallery:** Visit `/gallery` - should load photos
2. **Add Review:** Click on any photo → "Add Review" → Submit
3. **Verify in Firebase:** Check Firestore → comments collection
4. **Test Global Access:** Open in incognito/another device - reviews should be visible

## Current Behavior (Without Firebase Setup)

- ✅ App works with sample photos
- ✅ Gallery displays correctly
- ❌ Reviews are NOT saved (Firebase needed)
- ℹ️ Message in console: "Firebase not configured"

## After Firebase Setup

- ✅ Real photos from Firestore
- ✅ Reviews saved globally
- ✅ All users see same content
- ✅ Real-time updates

## Troubleshooting

**Issue: "Firebase not configured" in console**
→ Complete Steps 1-2 above and restart server

**Issue: Reviews not saving**
→ Check Firestore security rules (Step 4)

**Issue: Permission denied**
→ Make sure rules allow create on comments collection

## Alternative: Keep Using LocalStorage (Old System)

If you don't want to use Firebase yet, you can revert:

```bash
git checkout HEAD -- src/firebase/firestoreService.js src/utils/comments.js src/pages/Gallery.jsx src/components/CommentSection.jsx src/components/PhotoCard.jsx
```

This will restore localStorage-based reviews (not globally accessible).

---

**Need Help?** See full guide: [FIREBASE_MIGRATION_GUIDE.md](./FIREBASE_MIGRATION_GUIDE.md)
