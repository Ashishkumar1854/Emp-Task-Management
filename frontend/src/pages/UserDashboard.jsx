import React, { useEffect, useState } from "react";
import API from "../services/api";
import TaskItem from "../components/TaskItem-Modern";
import TaskDetails from "../components/TaskDetails";
import "../styles/userDashboard.css";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/tasks/mine");
      setTasks(res.data);
    } catch (e) {
      console.error("Failed to load tasks:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      await API.put(`/tasks/${taskId}`, updatedData);
      loadTasks();
    } catch (e) {
      console.error("Task update error:", e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    highPriority: tasks.filter((t) => t.priority === "high").length,
  };

  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchFilter = filterStatus === "all" || task.status === filterStatus;
    return matchSearch && matchFilter;
  });

  return (
    <div className="user-dashboard-layout">
      {/* Sidebar */}
      <aside className="user-sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">👤</span>
          <span className="logo-text">UserHub</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item active">
            <span className="nav-icon">📋</span>
            <span>My Tasks</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">✅</span>
            <span>Completed</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">⏳</span>
            <span>In Progress</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">⏸</span>
            <span>Pending</span>
          </div>
        </nav>

        <div className="sidebar-user-section">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="user-details">
            <p className="user-name">{user?.name || "User"}</p>
            <p className="user-role">👤 Member</p>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="user-main">
        {/* Header */}
        <header className="user-header">
          <div className="header-left">
            <h1>My Tasks</h1>
            <p>View and manage your assigned tasks</p>
          </div>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search your tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Content */}
        <div className="user-content">
          {/* Quick Stats */}
          <section className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon">📌</div>
              <div className="stat-info">
                <p className="stat-label">My Tasks</p>
                <p className="stat-number">{stats.total}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <p className="stat-label">Completed</p>
                <p className="stat-number">{stats.completed}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <p className="stat-label">In Progress</p>
                <p className="stat-number">{stats.inProgress}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⏸</div>
              <div className="stat-info">
                <p className="stat-label">Pending</p>
                <p className="stat-number">{stats.pending}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <p className="stat-label">Progress</p>
                <p className="stat-number">{completionRate}%</p>
              </div>
            </div>
          </section>

          {/* Progress Bar */}
          <section className="progress-section">
            <div className="progress-card">
              <h3>Overall Progress</h3>
              <div className="progress-bar-container">
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
                <p className="progress-text">{completionRate}% Complete</p>
              </div>
              <div className="progress-breakdown">
                <div className="progress-item">
                  <span>
                    Completed: {stats.completed}/{stats.total}
                  </span>
                  <div className="mini-bar">
                    <div
                      className="mini-fill completed"
                      style={{
                        width: `${(stats.completed / stats.total) * 100 || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="progress-item">
                  <span>
                    In Progress: {stats.inProgress}/{stats.total}
                  </span>
                  <div className="mini-bar">
                    <div
                      className="mini-fill inprogress"
                      style={{
                        width: `${(stats.inProgress / stats.total) * 100 || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="progress-item">
                  <span>
                    Pending: {stats.pending}/{stats.total}
                  </span>
                  <div className="mini-bar">
                    <div
                      className="mini-fill pending"
                      style={{
                        width: `${(stats.pending / stats.total) * 100 || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tasks Section */}
          <section className="tasks-section">
            <div className="section-header">
              <h2>My Assigned Tasks</h2>
              <div className="filter-tabs">
                {["all", "Pending", "In Progress", "Completed"].map(
                  (status) => (
                    <button
                      key={status}
                      className={`filter-btn ${
                        filterStatus === status ? "active" : ""
                      }`}
                      onClick={() => setFilterStatus(status)}
                    >
                      {status === "all" ? "All" : status}
                    </button>
                  ),
                )}
              </div>
            </div>

            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your tasks...</p>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="empty-state">
                <p>🎉 No tasks assigned yet</p>
                <p className="empty-message">Check back soon!</p>
              </div>
            ) : (
              <div className="tasks-grid">
                {filteredTasks.map((task) => (
                  <div
                    key={task._id}
                    onClick={() => setSelectedTask(task)}
                    className="task-card-wrapper"
                  >
                    <TaskItem
                      task={task}
                      onUpdate={() => {
                        const statuses = [
                          "Pending",
                          "In Progress",
                          "Completed",
                        ];
                        const nextStatus =
                          statuses[
                            (statuses.indexOf(task.status) + 1) %
                              statuses.length
                          ];
                        handleUpdateTask(task._id, { status: nextStatus });
                      }}
                      onDelete={null}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          isAdmin={false}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateTask}
          onDelete={null}
        />
      )}
    </div>
  );
}
