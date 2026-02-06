import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    nav("/login");
    return null;
  }

  const handleContinue = async () => {
    if (!selectedRole) return;
    setLoading(true);
    try {
      const res = await API.put("/auth/role", { role: selectedRole });
      localStorage.setItem("user", JSON.stringify(res.data));
      setTimeout(() => nav("/dashboard"), 500);
    } catch (err) {
      console.error("Role update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="role-container">
      <div className="role-card">
        <h2>Choose Your Role</h2>
        <p className="subtitle">Select how you want to use Task Master</p>

        <div className="role-options">
          {/* Admin Role */}
          <div
            className={`role-btn ${selectedRole === "admin" ? "active" : ""}`}
            onClick={() => setSelectedRole("admin")}
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <div className="role-emoji">👨‍💼</div>
            <h3>Admin</h3>
            <p>Create, assign & manage all tasks for your team</p>
            <div
              style={{
                fontSize: "12px",
                marginTop: "12px",
                opacity: 0.7,
                display: selectedRole === "admin" ? "block" : "none",
              }}
            >
              ✅ Full access enabled
            </div>
          </div>

          {/* User Role */}
          <div
            className={`role-btn ${selectedRole === "user" ? "active" : ""}`}
            onClick={() => setSelectedRole("user")}
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <div className="role-emoji">👤</div>
            <h3>User</h3>
            <p>View and update your assigned tasks</p>
            <div
              style={{
                fontSize: "12px",
                marginTop: "12px",
                opacity: 0.7,
                display: selectedRole === "user" ? "block" : "none",
              }}
            >
              ✅ User mode ready
            </div>
          </div>
        </div>

        <button
          className="role-submit"
          onClick={handleContinue}
          disabled={!selectedRole || loading}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              <span>Setting up your dashboard...</span>
            </>
          ) : (
            <>
              <span>Continue to Dashboard</span>
              <span style={{ marginLeft: "8px" }}>→</span>
            </>
          )}
        </button>

        <p
          style={{
            fontSize: "12px",
            color: "#a0aec0",
            marginTop: "20px",
            marginBottom: 0,
          }}
        >
          💡 You can change your role anytime from settings
        </p>
      </div>
    </div>
  );
}
