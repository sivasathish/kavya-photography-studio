# Firebase Migration Guide - Reviews & Ratings

## Overview
This guide will help you migrate image reviews and ratings from localStorage to Firebase Firestore, making them globally accessible to all users.

## What Has Changed

### Before (LocalStorage)
- Reviews and ratings stored in browser's localStorage
- Data only visible to the user's browser
- Not shared across devices or users
- No real-time sync

### After (Firebase Firestore)
- Reviews and ratings stored in cloud database
- Globally accessible to all users
- Real-time synchronization
- Persistent across all devices

## Files Modified

1. **`src/firebase/firestoreService.js`** - Added comment/review functions
2. **`src/utils/comments.js`** - Updated to use Firebase instead of localStorage
3. **`src/pages/Gallery.jsx`** - Fetch photos from Firestore
4. **`src/components/CommentSection.jsx`** - Async operations for reviews
5. **`src/components/PhotoCard.jsx`** - Real-time rating updates

## Setup Steps

### Step 1: Ensure Firebase Configuration

Make sure you have a `.env` file in your project root with Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

If you don't have these, follow the Firebase setup guide in `SETUP_GUIDE.md`.

### Step 2: Configure Firestore Security Rules

Go to Firebase Console → Firestore Database → Rules and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Photos collection - read for all, write for authenticated admins only
    match /photos/{photoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Comments collection - read for all, create for all, delete for admins only
    match /comments/{commentId} {
      allow read: if true;
      allow create: if true; // Anyone can add comments
      allow update, delete: if request.auth != null; // Only admins can delete
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null;
      allow create: if true;
    }
  }
}
```

**Important:** Click "Publish" to save the rules!

### Step 3: Create Firestore Collections

Your Firestore database needs these collections:

#### 1. `photos` Collection
Each photo document should have:
```javascript
{
  title: "Photo Title",
  category: "wedding", // or "portrait", "event", "studio"
  imageUrl: "https://...",
  createdAt: Timestamp
}
```

#### 2. `comments` Collection (New!)
Each comment document will have:
```javascript
{
  photoId: "photo-id-here",
  name: "User Name",
  email: "user@example.com",
  comment: "Great photo!",
  rating: 5, // 1-5 stars
  approved: true,
  createdAt: Timestamp
}
```

### Step 4: Add Sample Photos to Firestore

You can add photos through the Admin Dashboard, or run this in browser console:

```javascript
// Open your site in browser, open DevTools Console, and run:
import { generateSamplePhotos } from './src/firebase/firestoreService';
await generateSamplePhotos();
```

Or add manually through Firebase Console → Firestore Database → Add Collection → "photos"

### Step 5: Test the Application

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Test Gallery Page:**
   - Visit `/gallery`
   - Photos should load from Firestore
   - Click on a photo to view details

3. **Test Adding Reviews:**
   - Click "Add Review" button on any photo
   - Fill in name, rating, and comment
   - Submit the review
   - Review should appear immediately and be visible to all users

4. **Test from Different Devices/Browsers:**
   - Open the site on another device or incognito window
   - Reviews should be visible everywhere
   - Add a review from one device
   - It should appear on other devices after refresh

### Step 6: Migrate Existing LocalStorage Data (Optional)

If you have existing reviews in localStorage that you want to preserve:

1. Open your site in the browser where reviews exist
2. Open Browser DevTools Console
3. Run this migration script:

```javascript
// Get localStorage comments
const COMMENTS_KEY = 'kavya_photo_comments';
const localComments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}');

// Import addComment function
import { addComment } from './src/utils/comments';

// Migrate each comment
for (const [photoId, comments] of Object.entries(localComments)) {
  for (const comment of comments) {
    await addComment(photoId, {
      name: comment.name,
      email: comment.email,
      comment: comment.comment,
      rating: comment.rating
    });
    console.log(`Migrated comment for photo ${photoId}`);
  }
}

// Clear localStorage after successful migration
localStorage.removeItem(COMMENTS_KEY);
console.log('Migration complete! LocalStorage cleared.');
```

## Database Structure

### Firestore Collections:

```
kavya-studio-db/
├── photos/
│   ├── {photoId}/
│   │   ├── title: string
│   │   ├── category: string
│   │   ├── imageUrl: string
│   │   └── createdAt: Timestamp
│   └── ...
├── comments/
│   ├── {commentId}/
│   │   ├── photoId: string
│   │   ├── name: string
│   │   ├── email: string
│   │   ├── comment: string
│   │   ├── rating: number (1-5)
│   │   ├── approved: boolean
│   │   └── createdAt: Timestamp
│   └── ...
└── bookings/
    └── ...
```

## Verification Checklist

- [ ] Firebase configuration is set up in `.env`
- [ ] Firestore security rules are published
- [ ] `photos` collection exists with sample photos
- [ ] `comments` collection is created (will be auto-created on first comment)
- [ ] Gallery page loads photos from Firestore
- [ ] Can add reviews to photos
- [ ] Reviews appear for all users (test in incognito/another device)
- [ ] Star ratings display correctly
- [ ] Average rating updates after new reviews

## Troubleshooting

### Issue: Photos not loading
**Solution:** Check if:
1. Firebase config in `.env` is correct
2. Photos exist in Firestore `photos` collection
3. Firestore rules allow read access
4. Check browser console for errors

### Issue: Cannot add comments
**Solution:** Check if:
1. Firestore rules allow create on `comments` collection
2. Network connection is active
3. Check browser console for errors

### Issue: Reviews not visible to other users
**Solution:** 
1. Verify reviews are in Firestore (Firebase Console → Firestore Database)
2. Check Firestore security rules allow read access
3. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: "Permission denied" errors
**Solution:** 
1. Check and update Firestore security rules
2. Make sure rules are published
3. Wait a few minutes for rules to propagate

## Benefits of Firebase Implementation

✅ **Global Access** - All users see the same reviews and ratings
✅ **Real-time Sync** - Changes appear instantly across all devices
✅ **Scalability** - Can handle thousands of reviews
✅ **Reliability** - Google's infrastructure ensures high availability
✅ **Security** - Built-in authentication and authorization
✅ **Analytics** - Track user engagement with reviews
✅ **Future-proof** - Easy to add features like:
  - Reply to comments
  - Report inappropriate reviews
  - Like/helpful buttons
  - Image attachments to reviews
  - Admin moderation panel

## Next Steps

1. Monitor Firebase Usage (Free tier limits):
   - 50K reads/day
   - 20K writes/day
   - 1GB storage
   
2. Consider adding:
   - Email notifications for new reviews
   - Review moderation dashboard
   - User authentication for verified reviews
   - Image uploads with reviews

3. Backup Strategy:
   - Enable Firebase automatic backups
   - Export data periodically
   - Monitor quota usage

## Support

If you encounter issues:
1. Check Firebase Console for errors
2. Review browser console for JavaScript errors
3. Verify Firestore security rules
4. Check network tab for failed requests

---

**Migration Complete! 🎉**

Your reviews and ratings are now stored globally in Firebase Firestore and accessible to all users!
