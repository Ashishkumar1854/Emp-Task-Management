import React, { useEffect, useState } from "react";
import API from "../services/api";
import TaskItem from "../components/TaskItem-Modern";
import TaskDetails from "../components/TaskDetails";
import "../styles/adminDashboard.css";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
  });

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/tasks/all");
      setTasks(res.data);
    } catch (e) {
      console.error("Failed to load tasks:", e);
    }
    setLoading(false);
  };

  const loadUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (e) {
      console.error("Failed to load users:", e);
    }
  };

  useEffect(() => {
    loadTasks();
    loadUsers();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    try {
      await API.post("/tasks", formData);
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
      });
      setShowCreateForm(false);
      loadTasks();
    } catch (e) {
      console.error("Task creation error:", e);
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      await API.put(`/tasks/${taskId}`, updatedData);
      loadTasks();
    } catch (e) {
      console.error("Task update error:", e);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      loadTasks();
    } catch (e) {
      console.error("Task delete error:", e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

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
    <div className="admin-dashboard-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">👨‍💼</span>
          <span className="logo-text">AdminHub</span>
        </div>

        <nav className="sidebar-nav">
          <div
            className={`nav-item ${activeNav === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveNav("dashboard")}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </div>
          <div
            className={`nav-item ${activeNav === "tasks" ? "active" : ""}`}
            onClick={() => setActiveNav("tasks")}
          >
            <span className="nav-icon">📋</span>
            <span>All Tasks</span>
          </div>
          <div
            className={`nav-item ${activeNav === "team" ? "active" : ""}`}
            onClick={() => setActiveNav("team")}
          >
            <span className="nav-icon">👥</span>
            <span>Team Members</span>
          </div>
          <div
            className={`nav-item ${activeNav === "settings" ? "active" : ""}`}
            onClick={() => setActiveNav("settings")}
          >
            <span className="nav-icon">⚙️</span>
            <span>Settings</span>
          </div>
        </nav>

        <div className="sidebar-user-section">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="user-details">
            <p className="user-name">{user?.name || "Admin"}</p>
            <p className="user-role"> Admin</p>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
            <p>Manage all tasks and team members</p>
          </div>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="admin-content">
          {activeNav === "dashboard" && (
            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon total">📌</div>
                <div className="stat-info">
                  <p className="stat-label">Total Tasks</p>
                  <p className="stat-number">{stats.total}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon completed">✅</div>
                <div className="stat-info">
                  <p className="stat-label">Completed</p>
                  <p className="stat-number">{stats.completed}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon inprogress">⏳</div>
                <div className="stat-info">
                  <p className="stat-label">In Progress</p>
                  <p className="stat-number">{stats.inProgress}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pending">⏸</div>
                <div className="stat-info">
                  <p className="stat-label">Pending</p>
                  <p className="stat-number">{stats.pending}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon priority">🔴</div>
                <div className="stat-info">
                  <p className="stat-label">High Priority</p>
                  <p className="stat-number">{stats.highPriority}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon rate">📈</div>
                <div className="stat-info">
                  <p className="stat-label">Completion</p>
                  <p className="stat-number">{completionRate}%</p>
                </div>
              </div>
            </section>
          )}

          {activeNav === "tasks" && (
            <>
              <section className="create-task-section">
                <div className="section-header">
                  <h2>Create New Task</h2>
                  <button
                    className="btn-toggle"
                    onClick={() => setShowCreateForm(!showCreateForm)}
                  >
                    {showCreateForm ? "✖ Close" : "+ Create Task"}
                  </button>
                </div>

                {showCreateForm && (
                  <form
                    onSubmit={handleCreateTask}
                    className="create-task-form"
                  >
                    <input
                      type="text"
                      placeholder="Task Title *"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                    <textarea
                      placeholder="Description (optional)"
                      rows="3"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                    <div className="form-row">
                      <select
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData({ ...formData, priority: e.target.value })
                        }
                      >
                        <option value="low">🟢 Low Priority</option>
                        <option value="medium">🟡 Medium Priority</option>
                        <option value="high">🔴 High Priority</option>
                      </select>
                      <select
                        value={formData.assignedTo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            assignedTo: e.target.value,
                          })
                        }
                      >
                        <option value="">Assign to User (optional)</option>
                        {users.map((u) => (
                          <option key={u._id} value={u._id}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn-submit">
                      ✓ Create Task
                    </button>
                  </form>
                )}
              </section>

              <section className="tasks-section">
                <div className="section-header">
                  <h2>All Tasks</h2>
                  <div className="filter-tabs">
                    {["all", "Pending", "In Progress", "Completed"].map(
                      (status) => (
                        <button
                          key={status}
                          className={`filter-btn ${filterStatus === status ? "active" : ""}`}
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
                    <p>Loading tasks...</p>
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="empty-state">
                    <p>📭 No tasks found</p>
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
                          onUpdate={() =>
                            handleUpdateTask(task._id, {
                              status: ["Pending", "In Progress", "Completed"][
                                ([
                                  "Pending",
                                  "In Progress",
                                  "Completed",
                                ].indexOf(task.status) +
                                  1) %
                                  3
                              ],
                            })
                          }
                          onDelete={() => handleDeleteTask(task._id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {activeNav === "team" && (
            <section className="team-section">
              <h2>Team Members</h2>
              <div className="team-list">
                {users.length === 0 ? (
                  <p>No users found</p>
                ) : (
                  users.map((u) => (
                    <div key={u._id} className="team-item">
                      <div className="team-avatar">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="team-name">{u.name}</div>
                        <div className="team-email">{u.email}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {activeNav === "settings" && (
            <section className="settings-section">
              <h2>Settings</h2>
              <p>Basic settings panel. Add your configuration here.</p>
            </section>
          )}
        </div>

        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdate={(data) => {
              handleUpdateTask(selectedTask._id, data);
              setSelectedTask(null);
            }}
            onDelete={() => {
              handleDeleteTask(selectedTask._id);
              setSelectedTask(null);
            }}
            isAdmin={true}
          />
        )}
      </main>
    </div>
  );
}
