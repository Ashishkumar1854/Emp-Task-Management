# 🌐 Deployment Guide

This guide covers deploying the Task Management Dashboard to various platforms.


### : Render

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

### : Netlify

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


## Full URL Configuration

After deploying both services, configure frontend to use backend:

### Netlify Environment Variables

```
VITE_API_URL=https://your-backend.railway.app/api
```

### Build & Deploy

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


**Your app is now ready for production! 🚀**
