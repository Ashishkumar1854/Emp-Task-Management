# 🚀 Quick Start Guide

## Prerequisites ✅

- Node.js (v14+) installed
- MongoDB Atlas account with connection URI
- Two terminal windows

---

## Step 1: Backend Setup (Terminal Window 1)

### 1.1 Navigate to backend

```bash
cd backend
```

### 1.2 Create `.env` file with your MongoDB credentials

```bash
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskdb?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_12345_change_this
EOF
```

**Get your MongoDB URI:**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Click "Connect" → "Drivers"
4. Copy connection string
5. Replace `<password>` and `<username>` with your credentials

### 1.3 Start backend server

```bash
npm run dev
```

**Expected output:**

```
Connected to MongoDB
Server running on port 5000
```

---

## Step 2: Frontend Setup (Terminal Window 2)

### 2.1 Navigate to frontend

```bash
cd frontend
```

### 2.2 Create `.env` file

```bash
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF
```

### 2.3 Start frontend dev server

```bash
npm run dev
```

**Expected output:**

```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## Step 3: Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

---

## Test the Application

### Create Test Admin Account

1. Click "Sign up"
2. Fill in:
   - Name: `Admin User`
   - Email: `admin@test.com`
   - Password: `admin123`
3. Click "Create Account"
4. Choose "Admin" role
5. ✅ You're now logged in as Admin

### Create Test User Account

1. Logout (click "Logout" button)
2. Click "Sign up" again
3. Fill in:
   - Name: `Regular User`
   - Email: `user@test.com`
   - Password: `user123`
4. Click "Create Account"
5. Choose "User" role
6. ✅ You're now logged in as User

### Admin Functions

1. Login with admin@test.com
2. See "Create New Task" panel
3. Click "+ Add Task"
4. Fill in task details
5. Click "Create Task"
6. See task in "All Tasks" section

### User Functions

1. Login with user@test.com
2. You see only tasks assigned to you
3. Click "➔ Next Status" to update task status
4. Cannot delete or create tasks

---

## File Structure Reference

```
Task/
├── backend/
│   ├── models/          # Database schemas
│   ├── controllers/     # API logic
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth handlers
│   ├── server.js       # Main server file
│   ├── package.json
│   ├── .env            # Your credentials (don't commit!)
│   └── .env.example    # Template (safe to commit)
│
├── frontend/
│   ├── src/
│   │   ├── pages/      # Login, Signup, Dashboard
│   │   ├── components/ # TaskItem, etc.
│   │   ├── services/   # API client
│   │   └── styles/     # CSS files
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env            # Your config (don't commit!)
│   └── .env.example    # Template (safe to commit)
│
└── README.md           # Full documentation
```

---

## API Endpoints (curl examples)

### Signup

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

### Create Task (Admin only)

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the dashboard",
    "assignedTo": "user_id_here"
  }'
```

### Get All Tasks (Admin)

```bash
curl -X GET http://localhost:5000/api/tasks/all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get My Tasks (Any user)

```bash
curl -X GET http://localhost:5000/api/tasks/mine \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Troubleshooting

### Backend won't start

```
Error: connect ECONNREFUSED
→ MongoDB connection failed. Check MONGODB_URI in .env
```

### Frontend shows blank page

```
Error: Network request failed
→ Backend not running. Start it first in Terminal 1
```

### CORS Error

```
Error: Access-Control-Allow-Origin
→ Ensure VITE_API_URL points to correct backend URL
```

### Port already in use

```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

---

## Next Steps

### Deploy Backend

1. Create account on [Heroku](https://www.heroku.com) or [Railway](https://railway.app)
2. Push code to GitHub
3. Connect repository to deployment platform
4. Set environment variables
5. Deploy!

### Deploy Frontend

1. Create account on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
2. Import project from GitHub
3. Add environment variables
4. Deploy!

---

## Security Notes ⚠️

**Remember to:**

- ✅ Never commit `.env` files
- ✅ Change JWT_SECRET to random string
- ✅ Use strong passwords in tests
- ✅ Enable HTTPS in production
- ✅ Whitelist MongoDB IPs
- ✅ Use environment variables for all secrets

---

## Support

For detailed documentation, see [README.md](./README.md)

Happy coding! 🚀
