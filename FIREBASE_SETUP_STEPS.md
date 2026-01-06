# Firebase Setup Guide - Step by Step

Follow these steps carefully to set up Firebase for your Kavya Studio application.

---

## Step 1: Create a Firebase Project

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create New Project:**
   - Click "Add project" or "Create a project"
   - Enter project name: `kavya-studio` (or any name you prefer)
   - Click "Continue"

3. **Google Analytics (Optional):**
   - You can enable or disable Google Analytics
   - If enabled, select your Analytics account or create new one
   - Click "Create project"
   - Wait for project creation (takes ~30 seconds)

4. **Click "Continue"** when setup is complete

---

## Step 2: Register Your Web App

1. **Add Web App:**
   - In Firebase Console, click the **Web icon** (`</>`) to add a web app
   - Or click "Project Overview" → scroll down → click Web icon

2. **Register App:**
   - App nickname: `Kavya Studio Web App`
   - ✅ Check "Also set up Firebase Hosting" (optional but recommended)
   - Click "Register app"

3. **Copy Firebase Configuration:**
   - You'll see a configuration object like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "kavya-studio-xxxxx.firebaseapp.com",
     projectId: "kavya-studio-xxxxx",
     storageBucket: "kavya-studio-xxxxx.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef1234567890",
     measurementId: "G-XXXXXXXXXX"
   };
   ```
   - **KEEP THIS PAGE OPEN** - You'll need these values in Step 4

4. **Click "Continue to console"**

---

## Step 3: Enable Firestore Database

1. **Navigate to Firestore:**
   - In Firebase Console left sidebar, click **"Firestore Database"**
   - Click "Create database"

2. **Choose Location:**
   - **Start in production mode** (we'll set custom rules later)
   - Click "Next"

3. **Select Location:**
   - Choose closest to your users (e.g., `asia-south1` for India)
   - Click "Enable"
   - Wait for database creation (~1 minute)

4. **Update Security Rules:**
   - Click on **"Rules"** tab at the top
   - Replace everything with this:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       
       // Photos collection - anyone can read, only admins can write
       match /photos/{photoId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       
       // Comments collection - anyone can read and create, only admins can delete
       match /comments/{commentId} {
         allow read: if true;
         allow create: if true;
         allow update, delete: if request.auth != null;
       }
       
       // Bookings collection
       match /bookings/{bookingId} {
         allow create: if true;
         allow read, update, delete: if request.auth != null;
       }
     }
   }
   ```
   - Click **"Publish"** (very important!)

---

## Step 4: Enable Firebase Storage

1. **Navigate to Storage:**
   - In Firebase Console left sidebar, click **"Storage"**
   - Click "Get started"

2. **Security Rules:**
   - **Start in production mode**
   - Click "Next"

3. **Choose Location:**
   - Use same location as Firestore
   - Click "Done"

4. **Update Storage Rules:**
   - Click on **"Rules"** tab
   - Replace with:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /photos/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
   - Click **"Publish"**

---

## Step 5: Enable Authentication

1. **Navigate to Authentication:**
   - In Firebase Console left sidebar, click **"Authentication"**
   - Click "Get started"

2. **Enable Email/Password:**
   - Click on "Email/Password" provider
   - Toggle **Enable** switch ON
   - Click "Save"

3. **Add Admin User (Optional for now):**
   - Click on "Users" tab
   - Click "Add user"
   - Enter your email and password
   - Click "Add user"
   - This user can access admin dashboard later

---

## Step 6: Configure Your Application

1. **Create/Update .env file:**
   - In your project root (`/home/siva/Projects/KavyaStudio/`)
   - Create or edit `.env` file
   - Add these variables (use values from Step 2):

   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

   # EmailJS Configuration (keep existing if you have)
   VITE_EMAILJS_SERVICE_ID=your-service-id
   VITE_EMAILJS_TEMPLATE_ID=your-template-id
   VITE_EMAILJS_PUBLIC_KEY=your-public-key
   ```

2. **Replace the placeholder values:**
   - Copy each value from Firebase config (Step 2)
   - Paste into corresponding variable in `.env`
   - **DO NOT** add quotes around values
   - **DO NOT** commit this file to Git (it's in .gitignore)

3. **Save the file**

---

## Step 7: Add Sample Photos to Firestore

1. **In Firebase Console → Firestore Database:**
   - Click "Start collection"
   - Collection ID: `photos`
   - Click "Next"

2. **Add First Photo Document:**
   - Document ID: (Auto-ID)
   - Add fields:
     ```
     Field: title       | Type: string | Value: Beautiful Wedding Ceremony
     Field: category    | Type: string | Value: wedding
     Field: imageUrl    | Type: string | Value: https://images.unsplash.com/photo-1519741497674-611481863552?w=800
     Field: createdAt   | Type: timestamp | Value: (click calendar, select today)
     ```
   - Click "Save"

3. **Add More Photos (Repeat for 5-6 photos):**
   - Click "Add document"
   - Use different categories: `wedding`, `portrait`, `event`, `studio`
   - Use different Unsplash image URLs

**Quick Sample URLs:**
```
Wedding: https://images.unsplash.com/photo-1519741497674-611481863552?w=800
Wedding: https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800
Portrait: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800
Event: https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800
Studio: https://images.unsplash.com/photo-1492681290082-e932832941e6?w=800
```

---

## Step 8: Test Your Application

1. **Restart Development Server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Open in Browser:**
   - Go to: http://localhost:5173
   - Navigate to Gallery page

3. **Verify Photos Load:**
   - You should see photos from Firestore
   - No "Failed to load" error

4. **Test Adding Review:**
   - Click on any photo
   - Click "Add Review" button
   - Fill in name, rating, comment
   - Submit
   - Review should appear immediately

5. **Test in Another Browser/Incognito:**
   - Open site in incognito/another browser
   - Reviews should be visible there too
   - This confirms global storage is working!

---

## Step 9: Verify Everything Works

**Checklist:**
- [ ] Photos load on Gallery page
- [ ] Can click on photos to view details
- [ ] Can add reviews/ratings
- [ ] Reviews show star ratings
- [ ] Reviews visible in incognito mode
- [ ] Reviews persist after page refresh
- [ ] Average rating updates correctly

---

## Troubleshooting

### Error: "Failed to load photos"
**Solution:**
1. Check if `.env` file has correct values
2. Restart dev server after changing `.env`
3. Check browser console for specific errors
4. Verify Firestore rules are published

### Error: "Permission denied"
**Solution:**
1. Go to Firestore Database → Rules
2. Make sure rules allow `read: if true` for photos and comments
3. Click "Publish" button
4. Wait 1-2 minutes for rules to propagate

### Error: "Firebase not configured"
**Solution:**
1. Make sure all VITE_FIREBASE_* variables are in `.env`
2. No quotes around values
3. No spaces after `=`
4. Restart server after editing `.env`

### Photos not appearing
**Solution:**
1. Go to Firebase Console → Firestore Database
2. Check if `photos` collection exists
3. Add at least one photo document manually
4. Verify imageUrl field is a valid URL

---

## Security Best Practices

1. **Never commit `.env` to Git** - It's already in `.gitignore`
2. **Keep Firebase API key private** - Don't share publicly
3. **Use Authentication** - Set up admin login for sensitive operations
4. **Monitor Usage** - Check Firebase Console → Usage tab regularly
5. **Set Budgets** - Firebase Console → Project Settings → Usage and billing

---

## Firebase Free Tier Limits

✅ **Firestore:**
- 50K reads per day
- 20K writes per day
- 20K deletes per day
- 1 GB storage

✅ **Storage:**
- 5 GB storage
- 1 GB per day download

✅ **Authentication:**
- Unlimited users

**Note:** These limits are more than enough for a small photography business website!

---

## Next Steps After Setup

1. **Deploy to Netlify/Vercel:**
   - Add Firebase environment variables to hosting platform
   - Deploy and test production build

2. **Set Up Admin Dashboard:**
   - Use Firebase Authentication to protect admin routes
   - Add photo upload functionality

3. **Email Notifications:**
   - Configure EmailJS for booking confirmations
   - Get notified of new reviews

---

## Need Help?

If you encounter issues:

1. **Check Firebase Console:**
   - Go to each section (Firestore, Storage, Auth)
   - Look for error indicators

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for red errors
   - Check Network tab for failed requests

3. **Verify Configuration:**
   - Compare `.env` values with Firebase Console
   - Make sure no typos in variable names

---

## Quick Reference Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Firebase Hosting (after setup)
firebase deploy
```

---

**That's it! Your Firebase setup is complete! 🎉**

Your reviews and ratings are now stored globally and accessible to everyone!
