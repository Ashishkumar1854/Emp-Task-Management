import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Welcome Section */}
      <div className="auth-left">
        <div className="illustration">
          <div className="illustration-icon large">📋</div>
          <h1 className="illustration-title">Task Master</h1>
          <p className="illustration-subtitle">
            Manage your tasks efficiently and collaborate seamlessly with your
            team
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>

          <form onSubmit={submit} className="auth-form">
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
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                required
                disabled={loading}
              />
            </div>

            {/* Sign In Button */}
            <button type="submit" disabled={loading} className="auth-button">
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
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

          {/* Sign Up Link */}
          <div className="auth-footer">
            <p
              style={{
                fontSize: "13px",
                color: "#718096",
                marginBottom: "12px",
              }}
            >
              Don't have an account?{" "}
              <Link to="/signup" className="auth-link-button">
                Create one now
              </Link>
            </p>
            <p style={{ fontSize: "13px", color: "#718096", marginBottom: 0 }}>
              Forgot your password?{" "}
              <Link to="/forgot-password" className="auth-link-button">
                Reset it here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
