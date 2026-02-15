# 🚀 Deployment Guide - Kavya Photography Studio

## 📋 Pre-Deployment Checklist

### ✅ What's Ready:
- [x] Firebase Storage integration complete
- [x] Firestore database configured
- [x] Video upload support added
- [x] localStorage cleared and migrated to Firebase
- [x] All changes committed to Git
- [x] Storage rules updated for images & videos (50MB limit)
- [x] GitHub repository: https://github.com/sivasathish/kavya-photography-studio.git

---

## 🔥 Step 1: Deploy Firebase Rules

### 1.1 Initialize Firebase (if not done)
```bash
cd /home/siva/Projects/KavyaStudio
firebase login
firebase init
```

**During `firebase init`, select:**
- ✅ Firestore
- ✅ Storage
- ✅ Use existing project: `kavya-photography-studio`
- ✅ Use existing `firestore.rules`
- ✅ Use existing `storage.rules`
- ❌ No to Firestore indexes (for now)

### 1.2 Deploy Rules to Firebase
```bash
firebase deploy --only storage,firestore
```

**Expected output:**
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/kavya-photography-studio/overview
```

---

## 📦 Step 2: Push Code to GitHub

### 2.1 Add All Changes
```bash
cd /home/siva/Projects/KavyaStudio
git add .
```

### 2.2 Commit Changes
```bash
git commit -m "🔥 Firebase Storage integration with video support

- Migrated from Cloudinary to Firebase Storage
- Replaced localStorage with Firestore
- Added video upload/playback support
- Updated storage rules for 50MB limit
- Cleared old localStorage data on startup
- Added deletePhoto and deleteFromStorage functions"
```

### 2.3 Push to GitHub
```bash
git push origin main
```

*If you get an error about main/master branch:*
```bash
git push origin master
# OR
git branch -M main && git push -u origin main
```

---

## 🌐 Step 3: Deploy to Netlify

### Option A: Auto-Deploy from GitHub (Recommended)

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com/
   - Login with your account

2. **Import from GitHub**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select repository: `sivasathish/kavya-photography-studio`

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Add Environment Variables**
   Go to: **Site settings → Environment variables → Add a variable**
   
   Add these one by one:
   ```
   VITE_FIREBASE_API_KEY=AIzaSyDgE4AjoliFC_dqd3JUMj3XLRHdqRlr6fo
   VITE_FIREBASE_AUTH_DOMAIN=kavya-photography-studio.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=kavya-photography-studio
   VITE_FIREBASE_STORAGE_BUCKET=kavya-photography-studio.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=644918030638
   VITE_FIREBASE_APP_ID=1:644918030638:web:257b8350962d16b6398abf
   VITE_FIREBASE_MEASUREMENT_ID=G-BGHV7V1D4M
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (~2-3 minutes)
   - Your site will be live!

### Option B: Manual Deploy via CLI

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

---

## 🧪 Step 4: Test Your Deployed Site

### 4.1 Basic Tests
1. **Visit your site URL** (provided by Netlify)
2. **Check Gallery** - Should show empty or sample data initially
3. **Login as Admin** - Go to `/admin/login`
   - Username: `admin`
   - Password: (your admin password)
4. **Upload Test Image** - Try uploading from admin dashboard
5. **Check Gallery Again** - Verify image appears
6. **Test Video Upload** - Upload a small video
7. **Test Comments** - Add a review to an image
8. **Test Delete** - Delete an uploaded image

### 4.2 Firebase Console Check
Visit: https://console.firebase.google.com/project/kavya-photography-studio

Check:
- **Firestore Database** → `photos` collection (should have uploaded items)
- **Storage** → `gallery/` folder (should have uploaded files)
- **Storage Rules** → Should show updated rules with video support

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Firebase not configured" error
**Solution:** Make sure all environment variables are set in Netlify

### Issue 2: Upload fails
**Solution:** Deploy Firebase storage rules first:
```bash
firebase deploy --only storage
```

### Issue 3: Admin can't delete photos
**Solution:** Check Firebase Auth and storage rules. Admin email must match: `kaviyamobiles81@gmail.com`

### Issue 4: Videos not playing
**Solution:** Check file size (must be < 50MB) and format (mp4, webm recommended)

---

## 📊 Post-Deployment Monitoring

### Check These:
1. **Firebase Usage** - Monitor storage and database usage in Firebase Console
2. **Netlify Build Logs** - Check for any build warnings
3. **Browser Console** - Check for any JavaScript errors
4. **Storage Quota** - Firebase free tier: 5GB storage, 1GB/day bandwidth

---

## 🎯 Next Steps (Optional)

### Performance Optimization:
```bash
# Add to your project
npm install -D vite-plugin-compression
```

### Custom Domain:
- In Netlify: Site settings → Domain management → Add custom domain

### CDN & Caching:
- Already handled by Netlify automatically

---

## 📞 Support

If you encounter issues:
1. Check Firebase Console logs
2. Check Netlify deploy logs
3. Check browser console for errors
4. Review Firebase rules in console

---

## ✅ Deployment Complete!

Your site is now live with:
- ✅ Firebase Storage for images/videos
- ✅ Firestore database for metadata
- ✅ Real-time sync across all users
- ✅ Admin upload/delete capabilities
- ✅ Public viewing and commenting

**Enjoy your live photography website! 📸✨**
