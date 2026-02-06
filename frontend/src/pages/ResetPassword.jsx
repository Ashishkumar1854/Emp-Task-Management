import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/auth.css";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const nav = useNavigate();
  const { resetToken } = useParams();

  // Verify token on component load
  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!resetToken) {
          setErr("No reset token provided");
          setVerifying(false);
          return;
        }

        await API.get(`/auth/verify-reset-token/${resetToken}`);
        setTokenValid(true);
      } catch (e) {
        setErr("❌ Invalid or expired reset token. Please request a new one.");
        setTokenValid(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [resetToken]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    // Validation
    if (newPassword.length < 6) {
      setErr("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/reset-password", {
        resetToken,
        newPassword,
      });
      setSuccess("✅ " + res.data.message);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        nav("/login");
      }, 2000);
    } catch (e) {
      setErr(e?.response?.data?.message || "❌ Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (verifying) {
    return (
      <div className="auth-container">
        <div className="auth-right" style={{ gridColumn: "1 / -1" }}>
          <div className="auth-card" style={{ textAlign: "center" }}>
            <div
              className="loading-spinner"
              style={{ margin: "20px auto" }}
            ></div>
            <h2 className="auth-title">Verifying Reset Token...</h2>
            <p className="auth-subtitle">
              Please wait while we verify your token
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error if token invalid
  if (!tokenValid) {
    return (
      <div className="auth-container">
        <div className="auth-right" style={{ gridColumn: "1 / -1" }}>
          <div className="auth-card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>⏰</div>
            <h2 className="auth-title">Token Expired</h2>
            <p className="auth-subtitle">
              This reset token is invalid or has expired
            </p>
            <div
              className="auth-alert auth-error"
              style={{ marginTop: "20px" }}
            >
              <span className="alert-icon">⚠️</span>
              <span>{err}</span>
            </div>
            <Link to="/forgot-password" className="auth-button">
              Request New Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main reset password form
  return (
    <div className="auth-container">
      {/* Left Side - Illustration */}
      <div className="auth-left">
        <div className="illustration">
          <div className="illustration-icon">🔑</div>
          <h1 className="illustration-title">Create New Password</h1>
          <p className="illustration-subtitle">
            Set a strong password to secure your account. Make sure it's unique
            and hard to guess.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure & encrypted</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>Minimum 6 characters</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Instant activation</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛡️</span>
              <span>Password protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">Enter your new password below</p>

          <form onSubmit={submit} className="auth-form">
            {/* New Password Field */}
            <div
              className={`form-group ${focusedField === "newPassword" ? "focused" : ""}`}
            >
              <span className="form-icon">🔐</span>
              <input
                placeholder="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => setFocusedField("newPassword")}
                onBlur={() => setFocusedField(null)}
                required
                disabled={loading}
              />
            </div>

            {/* Confirm Password Field */}
            <div
              className={`form-group ${focusedField === "confirmPassword" ? "focused" : ""}`}
            >
              <span className="form-icon">✓</span>
              <input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocusedField("confirmPassword")}
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
                  <span>Resetting password...</span>
                </>
              ) : (
                <>
                  <span>Reset Password</span>
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

          {/* Back to Login Link */}
          <div className="auth-footer">
            <p className="auth-link-text">Changed your mind?</p>
            <Link to="/login" className="auth-link-button">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
