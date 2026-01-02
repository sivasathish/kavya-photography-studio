# EmailJS Setup Guide for Kaviya Photography

This guide will help you set up EmailJS to receive email notifications when customers book photography sessions.

## What is EmailJS?

EmailJS allows you to send emails directly from your website without a backend server. When someone books a session, you'll receive an email with all their details.

---

## Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right)
3. Create account with your email (the email where you want to receive booking notifications)
4. Verify your email address

**Free Tier Includes:**
- 200 emails per month
- No credit card required
- Perfect for small businesses

---

## Step 2: Connect Your Email Service

1. After logging in, go to **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended if you have Gmail)
   - **Outlook/Hotmail**
   - **Yahoo**
   - Or any other supported service
4. Click **"Connect Account"**
5. Follow the authorization process to connect your email
6. **Copy the Service ID** (e.g., `service_abc123`) - you'll need this later

---

## Step 3: Create Email Template

1. Go to **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. **Template Name:** `booking_notification`
4. **Subject:** `New Booking Request - {{customer_name}}`
5. **Content:** Copy and paste this template:

```
New Booking Request Received!

Customer Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{customer_name}}
Phone: {{customer_phone}}
Email: {{customer_email}}

Event Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Event Type: {{event_type}}
Preferred Date: {{event_date}}

Message from Customer:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Booking submitted on: {{booking_date}}

Please contact the customer to confirm the booking.

---
Kaviya Photography Studio
Automated Booking System
```

6. Click **"Save"**
7. **Copy the Template ID** (e.g., `template_xyz789`) - you'll need this later

---

## Step 4: Get Your Public Key

1. Go to **"Account"** (left sidebar)
2. Find the **"API Keys"** section
3. **Copy the Public Key** (e.g., `AbCdEfGhIjKlMnOp`) - you'll need this

---

## Step 5: Update Your .env File

Now you have three important values:
- **Service ID** (from Step 2)
- **Template ID** (from Step 3)
- **Public Key** (from Step 4)

1. Open your project's `.env` file
2. Replace the placeholder values:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123           # Your Service ID here
VITE_EMAILJS_TEMPLATE_ID=template_xyz789         # Your Template ID here
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp        # Your Public Key here
```

3. **Save the file**

---

## Step 6: Restart Your Development Server

After updating the `.env` file, you must restart the server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## Step 7: Test the Booking System

1. Go to your website's booking page: `http://localhost:3000/booking`
2. Fill out the booking form with test data
3. Submit the form
4. **Check your email inbox** - you should receive a notification email within 1-2 minutes

**If you don't receive the email:**
- Check your spam/junk folder
- Verify the EmailJS credentials in `.env` are correct
- Make sure you restarted the dev server after updating `.env`
- Check browser console for errors (F12 → Console tab)

---

## What Happens When Someone Books?

1. **Customer fills booking form** on your website
2. **Form validates** their information
3. **Booking saved to localStorage** (viewable in Admin Dashboard)
4. **Email sent to you instantly** with all booking details
5. **Customer sees success message** confirming their request

---

## View Bookings in Admin Dashboard

1. Login to admin panel: `http://localhost:3000/admin/login`
   - Username: `admin`
   - Password: `Kavya@2026`
2. Scroll down to **"Booking Requests"** section
3. Click **"Show Bookings"**
4. You can:
   - View all booking details
   - Update status (Pending → Confirmed/Cancelled)
   - Delete old bookings

---

## Troubleshooting

### Email Not Received?

**Check EmailJS Dashboard:**
1. Go to https://dashboard.emailjs.com/
2. Click "History" (left sidebar)
3. Look for recent email attempts
4. Check if any errors are shown

**Common Issues:**
- **Wrong credentials in .env** - Double-check Service ID, Template ID, and Public Key
- **Server not restarted** - Always restart after changing .env
- **Email in spam folder** - Check junk/spam folders
- **Free tier limit reached** - EmailJS free tier allows 200 emails/month

### Booking Not Saving?

- Open browser console (F12) and check for JavaScript errors
- Make sure localStorage is enabled in your browser
- Clear browser cache and try again

---

## Email Limits

**EmailJS Free Tier:**
- 200 emails per month
- After limit reached, emails won't send but bookings still save to admin dashboard
- Consider upgrading if you receive more than 200 bookings/month

**Upgrade Plans:**
- Personal: $8/month (1000 emails)
- Business: $15/month (5000 emails)

---

## Important Notes

✅ **Bookings save even if email fails** - They're stored in localStorage and visible in admin dashboard

✅ **No customer email sent** - Only you receive notifications (customer gets on-screen confirmation)

✅ **Works offline for admin** - Admin dashboard works without internet; only email sending needs internet

✅ **Secure** - Public key is safe to use in frontend code (it's designed for client-side use)

---

## Support

If you have issues with EmailJS:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

For issues with your Kaviya Photography website:
- Check the browser console (F12) for error messages
- Review this guide step by step
- Ensure all three EmailJS credentials are correctly set in `.env`

---

**Setup Complete!** 🎉

You'll now receive email notifications for every booking request. Remember to check your admin dashboard regularly to manage bookings and update their status.
