import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setSuccess("✅ Reset token generated!");
      setResetToken(res.data.resetToken);

      // Auto redirect after 3 seconds
      setTimeout(() => {
        nav(`/reset-password/${res.data.resetToken}`);
      }, 2000);
    } catch (e) {
      setErr(e?.response?.data?.message || "❌ Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side - Illustration */}
      <div className="auth-left">
        <div className="illustration">
          <div className="illustration-icon">🔐</div>
          <h1 className="illustration-title">Reset Password</h1>
          <p className="illustration-subtitle">
            Don't worry! We'll help you regain access to your account. Enter
            your email and we'll send you a reset link.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>Quick recovery process</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure password reset</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⏱️</span>
              <span>Token expires in 1 hour</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>Instant account access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-title">Forgot Password?</h2>
          <p className="auth-subtitle">
            Enter your email to receive a password reset link
          </p>

          <form onSubmit={submit} className="auth-form">
            {/* Email Field */}
            <div
              className={`form-group ${focusedField === "email" ? "focused" : ""}`}
            >
              <span className="form-icon">📧</span>
              <input
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
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
                  <span>Sending reset link...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
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

          {/* Reset Token Display (for demo) */}
          {resetToken && (
            <div
              style={{
                background: "#edf2f7",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "12px",
              }}
            >
              <p style={{ margin: "0 0 8px 0", fontWeight: 600 }}>
                Reset Token:
              </p>
              <code
                style={{
                  wordBreak: "break-all",
                  display: "block",
                  background: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              >
                {resetToken}
              </code>
              <p style={{ margin: "8px 0 0 0", opacity: 0.7 }}>
                You will be redirected to reset your password...
              </p>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="auth-footer">
            <p className="auth-link-text">Remember your password?</p>
            <Link to="/login" className="auth-link-button">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
