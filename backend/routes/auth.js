const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateRole,
  getUsers,
  forgotPassword,
  verifyResetToken,
  resetPassword,
} = require("../controllers/authController");
const { auth } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/verify-reset-token/:resetToken", verifyResetToken);
router.post("/reset-password", resetPassword);
router.put("/role", auth, updateRole);
router.get("/users", auth, getUsers);

module.exports = router;
