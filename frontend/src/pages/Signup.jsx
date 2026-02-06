import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await API.post("/auth/register", { name, email, password });
      setSuccess("✅ Account created! Redirecting...");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setTimeout(() => nav("/role-selection"), 1500);
    } catch (e) {
      setErr(e?.response?.data?.message || "❌ Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Illustration */}
      <div className="auth-left">
        <div className="illustration">
          <div className="illustration-icon">🚀</div>
          <h1 className="illustration-title">Get Started</h1>
          <p className="illustration-subtitle">
            Join the team and start managing tasks like a pro. Sign up in
            seconds!
          </p>

          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>Easy task management</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔐</span>
              <span>Secure & encrypted</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <span>Collaborate with teams</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Fast & responsive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join our task management platform</p>

          <form onSubmit={submit} className="auth-form">
            {/* Name Field */}
            <div
              className={`form-group ${focusedField === "name" ? "focused" : ""}`}
            >
              <span className="form-icon">👤</span>
              <input
                placeholder="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                required
                disabled={loading}
              />
            </div>

            {/* Email Field */}
            <div
              className={`form-group ${focusedField === "email" ? "focused" : ""}`}
            >
              <span className="form-icon">📧</span>
              <input
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div
              className={`form-group ${focusedField === "password" ? "focused" : ""}`}
            >
              <span className="form-icon">🔒</span>
              <input
                placeholder="Password (min 6 characters)"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                required
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="auth-button">
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="button-icon">→</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {err && (
            <div className="auth-alert auth-error">
              <span className="alert-icon">⚠️</span>
              <span>{err}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="auth-alert auth-success">
              <span className="alert-icon">🎉</span>
              <span>{success}</span>
            </div>
          )}

          {/* Sign In Link */}
          <div className="auth-footer">
            <p className="auth-link-text">Already have an account?</p>
            <Link to="/login" className="auth-link-button">
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
