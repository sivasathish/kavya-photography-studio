# Deployment Checklist - Kavya Photography Studio

## ✅ Pre-Deployment Checklist

Use this checklist to ensure everything is configured correctly before deploying to production.

---

## 🔥 Firebase Setup

### 1. Firebase Project Created
- [ ] Created Firebase project in console
- [ ] Project name: "kavya-photography-studio" (or similar)
- [ ] Billing set to Spark Plan (FREE)

### 2. Firestore Database
- [ ] Firestore Database enabled
- [ ] Started in **Production mode**
- [ ] Location selected (closest to users)
- [ ] Security rules deployed from `firestore.rules`
- [ ] **Admin email updated in security rules (line 14)**
- [ ] Rules published

### 3. Firebase Storage
- [ ] Storage enabled
- [ ] Started in **Production mode**
- [ ] Security rules deployed from `storage.rules`
- [ ] **Admin email updated in security rules (line 13)**
- [ ] Rules published

### 4. Firebase Authentication
- [ ] Authentication enabled
- [ ] Email/Password provider enabled
- [ ] Admin user created
- [ ] Admin email matches security rules

### 5. Firebase Configuration
- [ ] Web app registered in Firebase
- [ ] Configuration values copied
- [ ] All credentials saved securely

---

## 💻 Local Development

### 1. Dependencies Installed
- [ ] Node.js 18+ installed
- [ ] Ran `npm install` successfully
- [ ] No dependency errors

### 2. Environment Configuration
- [ ] Copied `.env.example` to `.env`
- [ ] All Firebase variables filled in `.env`:
  - [ ] VITE_FIREBASE_API_KEY
  - [ ] VITE_FIREBASE_AUTH_DOMAIN
  - [ ] VITE_FIREBASE_PROJECT_ID
  - [ ] VITE_FIREBASE_STORAGE_BUCKET
  - [ ] VITE_FIREBASE_MESSAGING_SENDER_ID
  - [ ] VITE_FIREBASE_APP_ID
  - [ ] VITE_FIREBASE_MEASUREMENT_ID
- [ ] `.env` added to `.gitignore` (already included)

### 3. Local Testing
- [ ] Ran `npm run dev` successfully
- [ ] Website opens at localhost:3000
- [ ] All pages load without errors
- [ ] Navigation works (Home, Gallery, Booking, Contact)
- [ ] No console errors (check F12)

### 4. Feature Testing
- [ ] Gallery displays (even if empty)
- [ ] Booking form submits successfully
- [ ] Firebase connection verified
- [ ] Responsive design works (test mobile view)

### 5. Sample Data (Optional)
- [ ] Added sample photos to Firestore
- [ ] Test booking submitted
- [ ] Gallery shows photos correctly

---

## 🎨 Customization

### 1. Content Updates
- [ ] Updated contact information in `Contact.jsx`:
  - [ ] Address
  - [ ] Phone numbers
  - [ ] Email addresses
  - [ ] Business hours
- [ ] Updated social media links:
  - [ ] Facebook URL
  - [ ] Instagram URL
  - [ ] WhatsApp number
  - [ ] YouTube URL (if applicable)

### 2. Branding (Optional)
- [ ] Updated color scheme in `index.css` (if desired)
- [ ] Replaced placeholder statistics in `Home.jsx`
- [ ] Customized hero section text
- [ ] Added studio logo (optional)

### 3. SEO Updates (Optional)
- [ ] Updated `<title>` in `index.html`
- [ ] Updated meta description
- [ ] Added keywords

---

## 🚀 Netlify Deployment

### 1. Git Repository
- [ ] Code pushed to GitHub/GitLab
- [ ] Repository is accessible
- [ ] `.env` is NOT committed (verify)
- [ ] All source files committed

### 2. Netlify Account
- [ ] Netlify account created (FREE)
- [ ] Logged in to Netlify dashboard

### 3. Site Creation
- [ ] Connected Git repository
- [ ] Build command set to: `npm run build`
- [ ] Publish directory set to: `dist`
- [ ] Node version set to: 18

### 4. Environment Variables
- [ ] Added all environment variables in Netlify:
  - [ ] VITE_FIREBASE_API_KEY
  - [ ] VITE_FIREBASE_AUTH_DOMAIN
  - [ ] VITE_FIREBASE_PROJECT_ID
  - [ ] VITE_FIREBASE_STORAGE_BUCKET
  - [ ] VITE_FIREBASE_MESSAGING_SENDER_ID
  - [ ] VITE_FIREBASE_APP_ID
  - [ ] VITE_FIREBASE_MEASUREMENT_ID

### 5. Deployment
- [ ] Triggered first deployment
- [ ] Build succeeded (check logs)
- [ ] Site is live
- [ ] Visited deployed URL

---

## 🧪 Production Testing

### 1. Basic Functionality
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Images load (if sample data added)
- [ ] No 404 errors
- [ ] Footer links work

### 2. Booking System
- [ ] Booking form loads
- [ ] Form validation works
- [ ] Can submit booking
- [ ] Success message displays
- [ ] Booking appears in Firestore

### 3. Gallery
- [ ] Gallery page loads
- [ ] Category filters work
- [ ] Photos display correctly
- [ ] Lazy loading works
- [ ] Empty state shows if no photos

### 4. Responsive Design
- [ ] Desktop view (1920px+)
- [ ] Laptop view (1366px)
- [ ] Tablet view (768px)
- [ ] Mobile view (375px)
- [ ] Navigation menu works on mobile

### 5. Performance
- [ ] Page loads in < 3 seconds
- [ ] Images load progressively
- [ ] No console errors
- [ ] No broken links

---

## 🔐 Security Verification

### 1. Firebase Security
- [ ] Firestore rules published
- [ ] Storage rules published
- [ ] Public users can read photos
- [ ] Public users can create bookings
- [ ] Public users CANNOT read bookings
- [ ] Admin email verified in rules

### 2. Environment Security
- [ ] `.env` not in Git repository
- [ ] API keys in Netlify environment variables
- [ ] No credentials in source code
- [ ] No console.log with sensitive data

### 3. Access Control
- [ ] Tested unauthorized access (should fail)
- [ ] Admin can authenticate
- [ ] Security rules working as expected

---

## 📱 Future Android App Prep

### 1. Database Structure
- [ ] "photos" collection exists
- [ ] "bookings" collection exists
- [ ] Field names match specification
- [ ] Timestamps use Firestore serverTimestamp

### 2. Security Rules
- [ ] Rules support both web and mobile
- [ ] Same authentication will work
- [ ] Data structure documented

---

## 📊 Monitoring Setup

### 1. Firebase Console
- [ ] Bookmarked Firebase Console
- [ ] Know how to check Firestore data
- [ ] Know how to view Storage usage
- [ ] Understand usage dashboard

### 2. Netlify Dashboard
- [ ] Bookmarked Netlify dashboard
- [ ] Know how to check deployments
- [ ] Understand analytics (if enabled)
- [ ] Know how to redeploy

### 3. Usage Limits
- [ ] Understand free tier limits
- [ ] Know how to check usage
- [ ] Set up alerts (optional)

---

## 📋 Post-Deployment Tasks

### 1. Documentation
- [ ] Saved Firebase credentials securely
- [ ] Documented admin credentials
- [ ] Bookmarked important URLs:
  - [ ] Live website URL
  - [ ] Netlify dashboard
  - [ ] Firebase console
  - [ ] Git repository

### 2. Backups
- [ ] Code in Git repository
- [ ] Firebase credentials saved securely
- [ ] Netlify environment variables documented

### 3. Share & Promote
- [ ] Share website URL with stakeholders
- [ ] Test on different devices
- [ ] Share on social media
- [ ] Add to Google Search Console (optional)

---

## 🎯 Quick Command Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint
```

---

## 🆘 Troubleshooting

### Build Fails on Netlify
1. Check build logs in Netlify dashboard
2. Verify all environment variables are set
3. Ensure Node version is 18+
4. Check for typos in variable names

### Firebase Connection Error
1. Verify environment variables
2. Check Firebase console for project status
3. Ensure security rules are published
4. Check browser console for errors

### Images Not Loading
1. Check Storage security rules
2. Verify image URLs in Firestore
3. Check browser network tab
4. Ensure CORS is configured

### Booking Form Not Working
1. Check Firestore security rules
2. Verify collection name is "bookings"
3. Check browser console for errors
4. Test with admin authentication

---

## ✅ Final Verification

Before marking complete, verify:

- [ ] Website is live and accessible
- [ ] All functionality tested and working
- [ ] No console errors in production
- [ ] Responsive design verified
- [ ] Booking form tested
- [ ] Firebase connection verified
- [ ] Credentials saved securely
- [ ] Documentation reviewed

---

## 🎉 Deployment Complete!

Congratulations! Your photography studio website is now live!

### What's Next?

1. **Add Content:**
   - Upload professional photos
   - Update contact information
   - Customize homepage content

2. **Monitor Usage:**
   - Check Firebase usage dashboard
   - Monitor booking submissions
   - Track website analytics

3. **Promote:**
   - Share on social media
   - Add to business cards
   - Submit to search engines

4. **Plan Enhancements:**
   - Consider admin dashboard
   - Plan Android app development
   - Add new features as needed

---

**🔗 Important Links:**
- Firebase Console: https://console.firebase.google.com/
- Netlify Dashboard: https://app.netlify.com/
- Setup Guide: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Quick Start: [QUICKSTART.md](./QUICKSTART.md)

**Need Help?** Review [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions!

---

**Last Updated:** December 29, 2025
**Built with ❤️ for Kavya Photography and Studio**
