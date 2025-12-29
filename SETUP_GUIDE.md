# Kavya Photography and Studio - Complete Setup Guide

## 📋 Table of Contents
1. [Firebase Setup](#firebase-setup)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Netlify Deployment](#netlify-deployment)
5. [Android App Integration](#android-app-integration)
6. [Free Tier Limits](#free-tier-limits)
7. [Admin Access](#admin-access)

---

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: **kavya-photography-studio**
4. Disable Google Analytics (optional, free tier)
5. Click "Create Project"

### Step 2: Register Web App

1. In Firebase Console, click the **Web icon** (`</>`)
2. Register app with nickname: **Kavya Photography Website**
3. ✅ Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. **Copy the Firebase configuration** - you'll need this later
6. Click "Continue to console"

### Step 3: Enable Cloud Firestore

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Select **Production mode** (we'll add security rules later)
4. Choose your database location (select closest to your users)
5. Click "Enable"

### Step 4: Enable Firebase Storage

1. In Firebase Console, go to **Build** → **Storage**
2. Click "Get started"
3. Select **Production mode**
4. Choose your storage location (same as Firestore)
5. Click "Done"

### Step 5: Set Up Security Rules

#### Firestore Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace the default rules with the content from `firestore.rules` file
3. Update the admin emails in the rules:
   ```javascript
   request.auth.token.email in [
     'admin@kavyaphotography.com',  // Replace with your admin email
     'your-actual-email@example.com'
   ];
   ```
4. Click **Publish**

#### Storage Rules

1. Go to **Storage** → **Rules** tab
2. Replace the default rules with the content from `storage.rules` file
3. Update the admin emails (same as Firestore)
4. Click **Publish**

### Step 6: Enable Authentication

1. Go to **Build** → **Authentication**
2. Click "Get started"
3. Select **Email/Password** sign-in method
4. Enable it and click "Save"
5. (Optional) Also enable **Google** sign-in for easier admin access

### Step 7: Create Admin User

1. Go to **Authentication** → **Users** tab
2. Click "Add user"
3. Enter admin email and password
4. Click "Add user"
5. This email must match what you put in the security rules!

### Step 8: Add Sample Data (Optional)

You can use the Firebase Console to manually add sample photos:

1. Go to **Firestore Database**
2. Click "Start collection"
3. Collection ID: **photos**
4. Add a document with these fields:
   - `title` (string): "Beautiful Wedding"
   - `category` (string): "Wedding"
   - `imageUrl` (string): "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
   - `createdAt` (timestamp): Click "Add field" → Select "timestamp" → Click "Add"

Repeat for more sample photos, or use the `generateSamplePhotos()` function in the code.

---

## 💻 Local Development Setup

### Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- npm or yarn package manager
- Git installed
- Code editor (VS Code recommended)

### Installation Steps

1. **Clone or navigate to project directory:**
   ```bash
   cd /home/siva/Projects/KavyaStudio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file with your Firebase config:**
   
   Open `.env` and replace with your Firebase credentials from Step 2:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Open browser:**
   - Navigate to `http://localhost:3000`
   - You should see the Kavya Photography website!

### Adding Sample Data

To populate your database with sample photos:

1. Open browser console (F12)
2. In the Console tab, run:
   ```javascript
   import { generateSamplePhotos } from './src/firebase/firestoreService.js';
   generateSamplePhotos();
   ```

Or add this temporarily to your `Home.jsx` component and run it once.

---

## ⚙️ Environment Configuration

### Environment Variables

The app uses Vite's environment variable system:

- **Development:** Create `.env` file (already done)
- **Production (Netlify):** Set via Netlify dashboard

### Important Notes:

- ✅ Variables starting with `VITE_` are exposed to the client
- ✅ API keys are safe to expose (restricted by Firebase security rules)
- ❌ Never commit `.env` file to Git (already in `.gitignore`)

---

## 🚀 Netlify Deployment

### Step 1: Prepare Repository

1. **Initialize Git (if not already):**
   ```bash
   cd /home/siva/Projects/KavyaStudio
   git init
   git add .
   git commit -m "Initial commit - Kavya Photography Studio"
   ```

2. **Push to GitHub/GitLab:**
   ```bash
   # Create a new repository on GitHub
   # Then run:
   git remote add origin https://github.com/yourusername/kavya-photography.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up or log in (FREE account)
3. Click "Add new site" → "Import an existing project"
4. Choose your Git provider (GitHub/GitLab)
5. Select your repository: **kavya-photography**
6. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18
7. Click "Show advanced" → "Add environment variables"

### Step 3: Add Environment Variables

Add all your Firebase config variables:

| Key | Value (from your Firebase config) |
|-----|-----------------------------------|
| `VITE_FIREBASE_API_KEY` | Your API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
| `VITE_FIREBASE_PROJECT_ID` | your-project-id |
| `VITE_FIREBASE_STORAGE_BUCKET` | your-project.appspot.com |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
| `VITE_FIREBASE_APP_ID` | Your app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Your measurement ID |

### Step 4: Deploy

1. Click "Deploy site"
2. Wait for build to complete (2-3 minutes)
3. Your site is live! 🎉

### Step 5: Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow instructions to configure DNS
4. SSL/HTTPS is automatic and FREE!

### Continuous Deployment

- ✅ Every push to `main` branch auto-deploys
- ✅ Preview deployments for pull requests
- ✅ Rollback to previous versions anytime

---

## 📱 Android App Integration

### How the Shared Database Works

The same Firestore database will be used by both:
1. ✅ React Web App (current)
2. ✅ Future Android App

### Data Structure (Android Compatible)

Both platforms use the same Firestore collections:

#### Photos Collection
```kotlin
// Android Kotlin model
data class Photo(
    val id: String = "",
    val title: String = "",
    val category: String = "",
    val imageUrl: String = "",
    val createdAt: Timestamp? = null
)
```

#### Bookings Collection
```kotlin
// Android Kotlin model
data class Booking(
    val id: String = "",
    val name: String = "",
    val phone: String = "",
    val email: String = "",
    val eventType: String = "",
    val date: String = "",
    val message: String = "",
    val createdAt: Timestamp? = null,
    val status: String = "pending"
)
```

### Android Firebase Setup

1. **Add Android app to Firebase:**
   - In Firebase Console, click "Add app" → Android icon
   - Enter package name: `com.kavyaphotography.studio`
   - Download `google-services.json`
   - Add to your Android project

2. **Add Firebase dependencies (build.gradle):**
   ```gradle
   implementation 'com.google.firebase:firebase-firestore-ktx:24.10.0'
   implementation 'com.google.firebase:firebase-storage-ktx:20.3.0'
   implementation 'com.google.firebase:firebase-auth-ktx:22.3.0'
   ```

3. **Use the same security rules:**
   - No changes needed!
   - The same Firestore rules work for both platforms
   - Public users: Read photos, create bookings
   - Admin users: Full access (implement authentication in Android)

### Sample Android Code (Firestore Read)

```kotlin
// Fetch all photos
val db = Firebase.firestore
db.collection("photos")
    .orderBy("createdAt", Query.Direction.DESCENDING)
    .get()
    .addOnSuccessListener { documents ->
        for (document in documents) {
            val photo = document.toObject<Photo>()
            // Display in RecyclerView
        }
    }
```

### Sample Android Code (Create Booking)

```kotlin
// Submit a booking
val booking = hashMapOf(
    "name" to "John Doe",
    "phone" to "1234567890",
    "email" to "john@example.com",
    "eventType" to "Wedding",
    "date" to "2025-02-15",
    "message" to "Looking for full day coverage",
    "createdAt" to FieldValue.serverTimestamp(),
    "status" to "pending"
)

db.collection("bookings")
    .add(booking)
    .addOnSuccessListener { documentReference ->
        // Show success message
    }
```

### Benefits of Shared Database

1. ✅ **Real-time Sync:** Changes on website instantly visible in app
2. ✅ **Single Source of Truth:** No data duplication
3. ✅ **Consistent Experience:** Same gallery on web and mobile
4. ✅ **Easy Management:** Admin updates photos once, shows everywhere
5. ✅ **Cost Efficient:** One database serves both platforms

---

## 💰 Free Tier Limits

### Firebase Spark Plan (FREE)

#### Firestore Database
- ✅ **Stored Data:** 1 GB
- ✅ **Reads:** 50,000 per day
- ✅ **Writes:** 20,000 per day
- ✅ **Deletes:** 20,000 per day

**Estimated Usage:**
- ~200 photos = ~50 KB (well under 1 GB)
- ~1000 bookings = ~100 KB
- Can handle **thousands of daily visitors**

#### Storage
- ✅ **Stored:** 5 GB
- ✅ **Downloads:** 1 GB per day
- ✅ **Uploads:** 20,000 per day

**Estimated Usage:**
- ~200 high-quality photos = ~500 MB (well under 5 GB)
- Can serve **hundreds of visitors daily**

#### Authentication
- ✅ **Unlimited** authentication on free tier
- ✅ Only admins need to authenticate

### Netlify Free Tier

- ✅ **Bandwidth:** 100 GB per month
- ✅ **Build Minutes:** 300 minutes per month
- ✅ **Sites:** Unlimited
- ✅ **Deployments:** Unlimited
- ✅ **SSL:** Free automatic HTTPS

**Estimated Usage:**
- Each page load: ~2-3 MB
- Can serve **30,000+ page views per month**

### Tips to Stay Within Free Tier

1. **Optimize Images:**
   - Use image compression (TinyPNG, Squoosh)
   - Use Unsplash URLs (free CDN) for sample data
   - Lazy load images (already implemented)

2. **Cache Static Assets:**
   - Netlify automatically caches
   - Set long cache headers

3. **Efficient Queries:**
   - Use pagination for large galleries
   - Filter on client side when possible
   - Index Firestore queries

4. **Monitor Usage:**
   - Firebase Console → Usage tab
   - Netlify Analytics dashboard
   - Set up usage alerts

---

## 🔐 Admin Access

### For Website Owners

#### How to Add/Manage Photos

**Option 1: Firebase Console (Easiest)**

1. Go to Firebase Console → Firestore Database
2. Click "photos" collection → "Add document"
3. Add fields:
   - `title`: "Your Photo Title"
   - `category`: "Wedding" | "Portrait" | "Events" | "Studio"
   - `imageUrl`: "https://your-image-url.com/photo.jpg"
   - `createdAt`: Click "Add field" → timestamp → now
4. Click "Save"

**Option 2: Admin Panel (Future Enhancement)**

You can build a simple admin panel:
- Create `/admin` route
- Protected by Firebase Authentication
- Form to upload images and add metadata
- List/Edit/Delete photos

#### How to View Bookings

1. Go to Firebase Console → Firestore Database
2. Click "bookings" collection
3. View all submitted bookings
4. Sort by `createdAt` to see latest

#### Managing Admin Users

1. Go to Firebase Console → Authentication
2. Add new users with admin email addresses
3. Update emails in security rules (`firestore.rules` and `storage.rules`)
4. Republish rules

### Security Best Practices

1. ✅ **Never share admin credentials**
2. ✅ **Use strong passwords (12+ characters)**
3. ✅ **Enable 2FA on Firebase account**
4. ✅ **Regularly review security rules**
5. ✅ **Monitor authentication logs**
6. ✅ **Keep dependencies updated:** `npm update`

---

## 🎯 Next Steps

### Immediate Actions

1. ✅ Complete Firebase setup
2. ✅ Configure environment variables
3. ✅ Deploy to Netlify
4. ✅ Add sample photos
5. ✅ Test booking form
6. ✅ Share website link!

### Future Enhancements

1. **Admin Panel:**
   - Build `/admin` dashboard
   - Upload photos directly from website
   - Manage bookings (approve/reject)
   - Analytics dashboard

2. **SEO Optimization:**
   - Add meta tags
   - Generate sitemap
   - Add structured data (Schema.org)
   - Submit to Google Search Console

3. **Performance:**
   - Image optimization pipeline
   - Progressive Web App (PWA)
   - Service worker for offline support

4. **Features:**
   - Photo lightbox/gallery viewer
   - Testimonials section
   - Blog for photography tips
   - Email notifications for bookings

5. **Android App:**
   - Develop native Android app
   - Reuse same Firestore database
   - Push notifications for booking updates

---

## 📞 Support & Resources

- **Firebase Documentation:** https://firebase.google.com/docs
- **Netlify Documentation:** https://docs.netlify.com
- **React Documentation:** https://react.dev
- **Vite Documentation:** https://vitejs.dev

---

## 📝 License

This project is free to use for **Kavya Photography and Studio**.

---

**Built with ❤️ for capturing beautiful memories**
