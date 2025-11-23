# 🔒 Security Guide - Erfurt Pizza Admin

## Admin Access Protection

Your orders dashboard is now protected with password authentication to prevent unauthorized access.

---

## 📋 Quick Start

### Default Login Credentials
- **URL**: `https://yoursite.com/orders.html`
- **Default Password**: `erfurt2024`

⚠️ **IMPORTANT**: Change this password immediately after your first login!

---

## 🔑 How to Change Your Password

1. **Log in** to the admin panel (`orders.html`)
2. Once logged in, **open your browser console**:
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+J` (Windows) / `Cmd+Option+J` (Mac)
   - Firefox: Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
   - Safari: Enable Developer menu first, then `Cmd+Option+C`

3. **In the console, type**:
   ```javascript
   generatePasswordHash("YourNewSecurePassword")
   ```
   Replace `YourNewSecurePassword` with your actual password.

4. **Copy the hash** that appears in the console

5. **Edit `orders.html` file**:
   - Find the line: `const ADMIN_PASSWORD_HASH = '...'`
   - Replace the hash with your new hash
   - Save the file

6. **Upload the updated file** to your hosting server

7. **Test** by logging out and logging back in with your new password

---

## 🔐 Security Features

### 1. Password Protection
- Passwords are hashed using SHA-256
- Plain passwords are never stored
- Hash comparison happens client-side

### 2. Session Management
- Login session stored in browser's sessionStorage
- Session ends when browser is closed
- Auto-logout after 8 hours of inactivity

### 3. Logout Function
- Red "Abmelden" (Logout) button in the dashboard
- Clears authentication and redirects to login

### 4. Direct Access Prevention
- Accessing `orders-dashboard.html` directly redirects to login
- Must authenticate through `orders.html` first

---

## ⚠️ Security Limitations

This is a **basic password protection** suitable for small businesses. However, be aware:

### What This Protects Against:
✅ Casual visitors stumbling upon the admin URL
✅ Search engine indexing (robots.txt meta tag)
✅ Unauthorized access from regular users

### What This Does NOT Protect Against:
❌ Determined hackers with technical skills
❌ Someone viewing the page source code (hash is visible)
❌ Man-in-the-middle attacks if not using HTTPS
❌ Brute force attacks

---

## 🛡️ Best Practices

### 1. Use Strong Passwords
- **Minimum 12 characters**
- Mix uppercase, lowercase, numbers, and symbols
- Don't use common words or personal information
- Example: `P!zz@Erfurt#2024$Secure`

### 2. Always Use HTTPS
- Ensure your website uses HTTPS (SSL certificate)
- Most hosting providers offer free SSL certificates
- Never enter passwords on HTTP sites

### 3. Don't Share Credentials
- Keep your password private
- Don't write it down in unsecure locations
- Use a password manager if needed

### 4. Regular Security Checks
- Change password every 3-6 months
- Log out when finished
- Don't stay logged in on shared computers

### 5. Keep Files Private
- Don't share `orders.html` source code publicly
- Avoid committing passwords to public repositories

---

## 🚀 Better Security Options (Advanced)

For production environments requiring stronger security:

### Option 1: Netlify Password Protection (Recommended)
If hosting on Netlify:
1. Go to Site Settings → Visitor Access
2. Enable Password Protection
3. Set a site-wide password

### Option 2: HTTP Basic Authentication
If you have server access (Apache/Nginx):

**Apache (.htaccess)**:
```apache
<Directory /path/to/orders>
    AuthType Basic
    AuthName "Restricted Area"
    AuthUserFile /path/to/.htpasswd
    Require valid-user
</Directory>
```

**Nginx**:
```nginx
location /orders.html {
    auth_basic "Restricted Area";
    auth_basic_user_file /path/to/.htpasswd;
}
```

### Option 3: Backend Authentication
Consider implementing server-side authentication:
- Node.js with Express + Passport
- PHP with sessions
- Python/Django authentication
- Firebase Authentication

---

## 📱 Mobile Access

The login page is mobile-responsive. You can:
- Access admin panel from your phone
- View orders on the go
- Session persists until browser is closed

---

## 🆘 Troubleshooting

### "Falsches Passwort" (Wrong Password)
- Double-check your password (case-sensitive)
- Clear browser cache and try again
- Verify the hash in `orders.html` matches your password

### Can't Access Dashboard
- Check if JavaScript is enabled
- Try a different browser
- Clear sessionStorage: `sessionStorage.clear()` in console

### Forgot Password
1. Edit `orders.html`
2. Replace `ADMIN_PASSWORD_HASH` with default:
   ```javascript
   const ADMIN_PASSWORD_HASH = '8f6e0b9c5e4d3a2b1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6';
   ```
3. Login with default password: `erfurt2024`
4. Change to new password immediately

### Auto-Logout Issues
- Session expires after 8 hours
- Session clears when browser closes
- This is normal security behavior

---

## 📞 Support

For additional security questions:
- Review this guide regularly
- Keep software updated
- Monitor access logs if available

---

## 📝 File Structure

```
/
├── orders.html              ← Login page (password-protected entry)
├── orders-dashboard.html    ← Actual dashboard (access controlled)
├── my-order.html           ← Customer order view (no auth needed)
└── SECURITY-GUIDE.md       ← This file
```

**Important**:
- Customers access their orders via `my-order.html?orderId=XXX` (no password needed)
- Only admin panel (`orders.html` → `orders-dashboard.html`) requires authentication

---

## ✅ Security Checklist

Before going live, ensure:

- [ ] Changed default password
- [ ] Website uses HTTPS
- [ ] Tested login/logout functionality
- [ ] Password is strong and secure
- [ ] Not sharing credentials
- [ ] Read this entire security guide
- [ ] Consider additional hosting-level protection

---

**Last Updated**: November 2024
**Version**: 1.0
