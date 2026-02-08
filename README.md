# 📋 Task Management Dashboard

A professional full-stack task management application built with **React**, **Node.js**, and **MongoDB**.

## 🎯 Features

### Authentication & Authorization

- ✅ JWT-based authentication
- ✅ Role-based access control (Admin / User)
- ✅ Secure password hashing with bcryptjs
- ✅ Protected routes & API endpoints
- ✅ **Forgot Password Feature** - Token-based password reset (1-hour expiry)

### Admin Features

- 🔐 Create, edit, delete, and manage all tasks
- 👥 Assign tasks to team members
- 📊 View complete task dashboard
- 📈 Monitor task progress

### User Features

- 👀 View assigned tasks only
- ✏️ Update task status (Pending → In Progress → Completed)
- 📋 Track personal task progress

### Task Management

- Title & Description
- Status tracking (Pending / In Progress / Completed)
- Task assignment
- Created date tracking
- Professional UI/UX with gradient design

---

## 🛠️ Tech Stack

| Component          | Technology                          |
| ------------------ | ----------------------------------- |
| **Frontend**       | React 18, Vite, React Router, Axios |
| **Backend**        | Node.js, Express.js, JWT            |
| **Database**       | MongoDB Atlas                       |
| **Styling**        | Custom CSS3 (Responsive)            |
| **Authentication** | JWT + bcryptjs                      |

---

## 📁 Project Structure

```
Task/
├── frontend/                   # React frontend (Vite)
│   ├── src/
│   │   ├── pages/            # Auth & Dashboard pages
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── RoleSelection.jsx
│   │   │   ├── ForgotPassword.jsx      # Password recovery page
│   │   │   ├── ResetPassword.jsx       # Password reset page
│   │   │   ├── AdminDashboard.jsx      # Admin dashboard
│   │   │   └── UserDashboard.jsx       # User dashboard
│   │   ├── components/       # Reusable components
│   │   │   ├── TaskDetails.jsx         # Task modal
│   │   │   └── TaskItem-Modern.jsx     # Task card
│   │   ├── services/         # API integration
│   │   │   └── api.js
│   │   └── styles/          # CSS stylesheets
│   │       ├── auth.css
│   │       ├── adminDashboard.css
│   │       ├── userDashboard.css
│   │       ├── taskDetails.css
│   │       ├── taskItem-modern.css
│   │       └── global.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── backend/                    # Node.js + Express backend
│   ├── models/               # Database schemas
│   │   ├── User.js
│   │   └── Task.js
│   ├── controllers/          # Business logic
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/          # Auth & validation
│   │   └── auth.js
│   ├── server.js           # Entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── README.md              # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB Atlas account ([Create free account](https://www.mongodb.com/cloud/atlas))
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```bash
cp .env.example .env
```

4. **Update `.env` with your credentials:**

```env
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskdb?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
```

5. **Start backend server:**

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5001`

---

### Frontend Setup

1. **Navigate to frontend folder:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```bash
cp .env.example .env
```

4. **Update `.env` (if backend is on different host):**

```env
VITE_API_URL=http://localhost:5001/api
```

5. **Start frontend dev server:**

```bash
npm run dev
```
---

## 🔐 Authentication Flow

```
1. User opens app → /login page
2. New users click signup → /signup
3. Create account with name, email, password
4. Auto-login after signup → /role-selection
5. Choose Admin or User role
6. Access dashboard → /dashboard
7. Logout clears token & returns to login

FORGOT PASSWORD FLOW:
1. Click "Forgot Password" on login page
2. Enter email address
3. Receive reset token (1-hour expiry)
4. Verify token and set new password
5. Login with new password
```

### Sample Test Accounts

After first signup, you can test different roles:

## 📡 API Endpoints

### Authentication

```http
POST /api/auth/register
{
  "name": "Ashish",
  "email": "ashish@example.com",
  "password": "pass123"
}

POST /api/auth/login
{
  "email": "raj@example.com",
  "password": "pass1234"
}

POST /api/auth/forgot-password
{
  "email": "@example.com"
}
Returns: { resetToken, resetLink }

GET /api/auth/verify-reset-token/:resetToken
Verifies if token is valid and not expired

POST /api/auth/reset-password
{
  "resetToken": "token_from_forgot_password",
  "newPassword": "newpassword123"
}

PUT /api/auth/role
Headers: Authorization: Bearer {token}
{
  "role": "admin" or "user"
}
```

### Tasks (Authenticated)

```http
# Create task (Admin only)
POST /api/tasks
Authorization: Bearer {token}
{
  "title": "Complete project",
  "description": "Finish the dashboard",
  "assignedTo": "user_id_here"
}

# Get all tasks (Admin)
GET /api/tasks/all
Authorization: Bearer {token}

# Get assigned tasks (Any user)
GET /api/tasks/mine
Authorization: Bearer {token}

# Update task status
PUT /api/tasks/{taskId}
Authorization: Bearer {token}
{
  "status": "In Progress"
}

# Delete task (Admin only)
DELETE /api/tasks/{taskId}
Authorization: Bearer {token}
```

---

## 🎨 UI Features

### Login Page

- Split-screen design (illustration + form)
- Email & password validation
- Error messages for invalid credentials
- Loading state with spinner
- **"Forgot Password" link** for password recovery
- Link to signup

### Signup Page

- Full name, email, password input
- Password validation
- Error handling
- Success message with redirect
- Link to login

### Forgot Password Page

- Email input for account recovery
- Token generation (1-hour expiry)
- Feature list showing benefits
- Auto-redirect to reset page
- Back to login link

### Reset Password Page

- Token verification before showing form
- New password & confirm password fields
- Password validation (min 6 chars)
- Graceful error handling for expired tokens
- Success message with auto-redirect to login
- Back to login link

### Role Selection

- Visual role comparison
- Admin & User cards with descriptions
- Select & continue flow
- Updates user role in database

### Dashboard

- **Admin View:**
  - Create task form (title, description, assign to)
  - View all tasks in grid layout
  - Update & delete actions
  - Task status tracking

- **User View:**
  - Personal tasks only
  - Status update button
  - No delete permission

- **Common:**
  - User badge with name & role
  - Logout button
  - Loading states
  - Empty states
  - Responsive grid layout

---

## 🌐 Deployment

### Deploy Backend (Heroku, Railway, Render)

1. **Create git repository:**

```bash
cd backend
git init
git add .
git commit -m "Initial commit"
```
### Deploy Frontend (Vercel, Netlify, GitHub Pages)

1. **Build frontend:**

```bash
npm run build
```

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskdb
JWT_SECRET=change_this_to_random_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Signup with new email
- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] Role selection works
- [ ] Admin can create tasks
- [ ] Admin can delete tasks
- [ ] User can only see assigned tasks
- [ ] User can update task status
- [ ] Logout clears data
- [ ] Protected routes redirect to login

---

## 🔒 Security Features

✅ **JWT Token Authentication**

- Secure token generation & validation
- 7-day token expiration
- Token stored in localStorage

✅ **Password Security**

- Bcryptjs hashing (10 salt rounds)
- No plain text passwords in database

✅ **Password Reset Security**

- Unique 32-byte reset tokens via crypto
- 1-hour token expiry (3600000 ms)
- Token verified before password change
- Old token cleared after successful reset
- Secure token-based flow without email service

✅ **Role-Based Access Control**

- Admin-only endpoints protected
- User permissions enforced
- Forbidden responses for unauthorized access

✅ **Input Validation**

- Email uniqueness check
- Required field validation
- Safe API request headers

---

## 🐛 Troubleshooting

**MongoDB Connection Error:**

```
Solution: Check connection string in .env
- Username & password correct?
- IP whitelisted in MongoDB Atlas?
- Database name matches?
```

**CORS Error:**

```
Solution: Ensure backend is running on correct port
- Backend running on :5000?
- Frontend API URL correct?
```

**Token Expired:**

```
Solution: Clear localStorage and login again
localStorage.clear()
```

---

## 📚 Code Quality

- ✅ Clean, readable code
- ✅ Proper error handling
- ✅ Reusable components
- ✅ Responsive design
- ✅ Modern best practices
- ✅ Professional folder structure

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT Explanation](https://jwt.io/introduction)
- [Vite Getting Started](https://vitejs.dev)

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👨‍💻 Author

Built with ❤️ as a full-stack application demonstrating React, Node.js, and MongoDB best practices.

---

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review API documentation
3. Ensure environment variables are set correctly

---

**Happy Task Managing! 🚀**
