# 🔐 Secure Authentication Setup Guide

This guide will help you set up **secure backend authentication** for the Erfurt Pizza orders dashboard.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `jsonwebtoken` - For JWT token generation and verification
- `@supabase/supabase-js` - Supabase client
- Other dependencies

### 2. Set Up Environment Variables

You need to configure **two new environment variables** in Netlify:

#### Required Environment Variables:

| Variable | Description | How to Generate |
|----------|-------------|-----------------|
| `ADMIN_PASSWORD_HASH` | SHA-256 hash of your admin password | See steps below |
| `JWT_SECRET` | Secret key for signing JWT tokens | Random 32+ character string |

#### Existing Supabase Variables (should already be set):
- `SUPABASE_URL`
- `SUPABASE_KEY`

---

## 📝 Step-by-Step Setup

### Step 1: Generate Admin Password Hash

Choose your admin password and generate its SHA-256 hash:

**Option A: Using Online Tool (Easiest)**
1. Go to: https://emn178.github.io/online-tools/sha256.html
2. Enter your desired admin password (e.g., "MySecurePassword123!")
3. Copy the resulting hash

**Option B: Using Command Line**
```bash
# On Linux/Mac:
echo -n "YourPasswordHere" | shasum -a 256

# On Windows (PowerShell):
$password = "YourPasswordHere"
$hasher = [System.Security.Cryptography.SHA256]::Create()
$hash = $hasher.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($password))
[BitConverter]::ToString($hash).Replace("-","").ToLower()
```

**Example:**
- Password: `erfurt2024`
- Hash: `8f6e0b9c5e4d3a2b1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6`

⚠️ **IMPORTANT:** The example password above is for demonstration only. **Use your own strong password!**

---

### Step 2: Generate JWT Secret

Generate a random secret key for JWT token signing:

**Option A: Using Command Line (Recommended)**
```bash
# On Linux/Mac:
openssl rand -hex 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Option B: Using Online Tool**
1. Go to: https://www.grc.com/passwords.htm
2. Copy one of the "63 random alpha-numeric characters" passwords

**Example:**
```
a7f3b9c8d2e1f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9
```

---

### Step 3: Add Environment Variables to Netlify

#### Via Netlify UI:
1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your "erfurt-pizza" site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add both variables:

   ```
   Key: ADMIN_PASSWORD_HASH
   Value: <your-generated-hash>
   ```

   ```
   Key: JWT_SECRET
   Value: <your-generated-secret>
   ```

6. Click **Save**

#### Via Netlify CLI:
```bash
# Set admin password hash
netlify env:set ADMIN_PASSWORD_HASH "your-hash-here"

# Set JWT secret
netlify env:set JWT_SECRET "your-secret-here"

# Verify they're set
netlify env:list
```

---

### Step 4: Deploy Your Site

After setting the environment variables, redeploy your site:

```bash
# Commit your changes
git add .
git commit -m "Add secure backend authentication"
git push

# Or deploy directly via Netlify CLI
netlify deploy --prod
```

---

## 🔒 Security Features

### What's Secured:

✅ **Backend Authentication**
- Password verification happens on the server
- JWT tokens are signed with secret key
- Tokens expire after 8 hours

✅ **Protected API Endpoints**
- `/netlify/functions/get-orders` - Requires auth token
- `/netlify/functions/update-order` - Requires auth token
- `/netlify/functions/delete-order` - Requires auth token

✅ **No Client-Side Secrets**
- Password hash is stored server-side only
- JWT secret never exposed to browser
- Tokens are verified on every request

### Authentication Flow:

1. **Login**: User enters password → Sent to `/admin-login` function
2. **Verification**: Backend hashes password and compares with `ADMIN_PASSWORD_HASH`
3. **Token Generation**: If valid, backend generates JWT token signed with `JWT_SECRET`
4. **Token Storage**: Frontend stores token in sessionStorage (expires in 8 hours)
5. **API Requests**: Token sent in `Authorization: Bearer <token>` header
6. **Token Verification**: Backend verifies token signature on each request

---

## 🔄 Changing Your Password

To change your admin password:

1. Generate a new SHA-256 hash of your new password
2. Update the `ADMIN_PASSWORD_HASH` environment variable in Netlify
3. Redeploy your site (or wait for the next automatic deploy)
4. All old sessions will be invalidated
5. Log in with your new password

---

## 🧪 Testing the Authentication

### Test Login:
1. Go to: `https://your-site.netlify.app/orders.html`
2. Enter your password
3. You should be redirected to the dashboard

### Test Token Expiry:
1. Log in successfully
2. Wait 8 hours (or manually clear sessionStorage)
3. Try to access the dashboard
4. You should be redirected back to login

### Test API Protection:
Try accessing the orders API without authentication:

```bash
curl https://your-site.netlify.app/.netlify/functions/get-orders
```

Expected response:
```json
{
  "success": false,
  "error": "No authorization header provided"
}
```

---

## 🚨 Troubleshooting

### "Server configuration error"
- **Cause**: Missing `ADMIN_PASSWORD_HASH` or `JWT_SECRET` environment variables
- **Solution**: Make sure both variables are set in Netlify and redeploy

### "Invalid password"
- **Cause**: Password hash doesn't match
- **Solution**: Regenerate the hash and verify it's set correctly in Netlify

### "Token has expired"
- **Cause**: More than 8 hours since login
- **Solution**: Simply log in again

### "Failed to fetch orders"
- **Cause**: Token expired or invalid, or Supabase connection issue
- **Solution**: Log out and log in again; check Supabase configuration

---

## 📚 Additional Resources

- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [JWT.io - Learn about JSON Web Tokens](https://jwt.io/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

## ✅ Security Checklist

Before going live, make sure:

- [ ] `ADMIN_PASSWORD_HASH` is set in Netlify
- [ ] `JWT_SECRET` is set in Netlify (32+ characters)
- [ ] You're using a **strong, unique password** (not "erfurt2024"!)
- [ ] Password is stored securely (password manager recommended)
- [ ] All environment variables are marked as "Secret" in Netlify
- [ ] You've tested login and API access
- [ ] Old localStorage authentication is no longer being used

---

**Need Help?** Check the Netlify Functions logs:
```bash
netlify functions:log admin-login
netlify functions:log get-orders
```
