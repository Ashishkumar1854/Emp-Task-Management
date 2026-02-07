# 🌐 Deployment Guide

This guide covers deploying the Task Management Dashboard to various platforms.

---

## Backend Deployment

### Option 1: Heroku (Easiest)

#### Prerequisites

- Heroku account (free tier available)
- Git repository
- Heroku CLI

#### Steps

1. **Login to Heroku:**

```bash
heroku login
```

2. **Create Heroku app:**

```bash
cd backend
heroku create your-app-name
```

3. **Set environment variables:**

```bash
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/taskdb"
heroku config:set JWT_SECRET="your_random_secret_key_12345"
```

4. **Deploy:**

```bash
git push heroku main
```

5. **View logs:**

```bash
heroku logs --tail
```

Your backend is now live at: `https://your-app-name.herokuapp.com`

---

### Option 2: Railway.app

#### Steps

1. Go to [railway.app](https://railway.app)
2. Click "Create Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account
5. Select backend repository
6. Add these variables in Environment:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_secret
   PORT=5000
   ```
7. Deploy!

**Backend URL:** `https://your-app-name.up.railway.app`

---

### Option 3: Render

#### Steps

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub
4. Select backend repository
5. Configure:
   - Name: `task-dashboard-backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables:
   ```
   MONGODB_URI=...
   JWT_SECRET=...
   ```
7. Create service

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

#### Steps

1. **Install Vercel CLI:**

```bash
npm i -g vercel
```

2. **Deploy from project folder:**

```bash
cd frontend
vercel
```

3. **Follow prompts:**
   - Link to existing project? `No`
   - Deploy to account
   - Select project name
   - Build settings: `vite build`

4. **Set environment variables:**

```bash
vercel env add VITE_API_URL
# Enter: https://your-backend-url/api
```

5. **Redeploy with env vars:**

```bash
vercel --prod
```

**Frontend URL:** `https://your-project-name.vercel.app`

---

### Option 2: Netlify

#### Steps

1. **Install Netlify CLI:**

```bash
npm install -g netlify-cli
```

2. **Deploy:**

```bash
cd frontend
netlify deploy --prod
```

3. **Login and authorize**

4. **Add environment variables:**
   - Go to Site Settings → Build & Deploy → Environment
   - Add: `VITE_API_URL={{your-backend-url}}/api`

5. **Redeploy**

---

### Option 3: GitHub Pages

**Note:** GitHub Pages is static only. Use for frontend without custom backend.

1. **Update vite.config.js:**

```javascript
export default {
  base: "/task-dashboard/",
  // ... rest of config
};
```

2. **Add GitHub token:**

```bash
export GITHUB_TOKEN=your_token
```

3. **Deploy to GitHub Pages:**

```bash
npm run build
# Commit and push to gh-pages branch
```

---

## Full URL Configuration

After deploying both services, configure frontend to use backend:

### Vercel Environment Variables

```
VITE_API_URL=https://your-backend.herokuapp.com/api
```

### Netlify Environment Variables

```
VITE_API_URL=https://your-backend.railway.app/api
```

### Build & Deploy

```bash
# Frontend - rebuild and redeploy
vercel --prod
# or
netlify deploy --prod
```

---

## Database - MongoDB Atlas

### Setup MongoDB Atlas

1. **Create account:** [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create cluster:**
   - Click "Build a Database"
   - Choose Free tier (M0)
   - Select region
   - Create cluster

3. **Create database user:**
   - Database Access → Add New Database User
   - Generate secure password
   - Note username & password

4. **Whitelist IP:**
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` for all IPs (less secure)
   - Or add specific production IPs

5. **Get connection string:**
   - Cluster overview → Connect → Drivers
   - Copy connection string
   - Replace `<username>` and `<password>`

**Connection String Format:**

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskdb?retryWrites=true&w=majority
```

---

## Performance Optimizations

### Frontend

```bash
# Build and check bundle size
npm run build

# Analyze bundle
npm install -g webpack-bundle-analyzer
```

### Backend

- Use connection pooling
- Add caching headers
- Enable gzip compression
- Monitor performance in production

---

## Monitoring & Logging

### Heroku

```bash
heroku logs --tail
heroku logs -n 50  # Last 50 lines
```

### Railway

- Dashboard shows real-time logs
- Click "Logs" tab to view

### Vercel

- Deployments → Select deployment → Logs

---

## SSL/HTTPS

**Automatically enabled on:**

- ✅ Heroku (\*.herokuapp.com)
- ✅ Railway (\*.up.railway.app)
- ✅ Render (\*.onrender.com)
- ✅ Vercel (\*.vercel.app)
- ✅ Netlify (\*.netlify.app)

---

## Cost Estimates (Monthly)

| Service                  | Cost         |
| ------------------------ | ------------ |
| Backend (Heroku Free)    | $0 (limited) |
| Backend (Railway)        | $5-20        |
| Frontend (Vercel)        | $0-20        |
| Database (MongoDB Atlas) | $0-50        |
| **Total**                | **$5-90**    |

---

## Troubleshooting

### Backend won't start

```
Check logs: heroku logs --tail
Common issues:
- MongoDB connection string wrong
- Missing environment variables
- Port not set to process.env.PORT
```

### Frontend shows blank

```
Check browser console for errors
Likely causes:
- API URL incorrect in .env
- Backend not running
- CORS issues
```

### MongoDB connection timeout

```
Whitelist your IP in MongoDB Atlas
Network Access → IP Whitelist
```

---

## CI/CD Pipeline (GitHub Actions)

**Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "16"
      - run: cd backend && npm install && npm test
      - run: git push heroku main

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd frontend && npm install && npm run build
      - run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## Production Checklist

- [ ] Environment variables set correctly
- [ ] MongoDB Atlas whitelist updated
- [ ] Backend running and responding
- [ ] Frontend API URL pointing to live backend
- [ ] HTTPS enabled
- [ ] Error logging configured
- [ ] Database backups enabled
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] Secrets not committed to git

---

## Support Links

- [Heroku Docs](https://devcenter.heroku.com)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Help](https://docs.mongodb.com/manual)
- [Express Deployment](https://expressjs.com/en/advanced/best-practice-deployment.html)

---

**Your app is now ready for production! 🚀**
