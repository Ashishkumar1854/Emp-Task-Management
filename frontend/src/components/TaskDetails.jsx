import React, { useState } from "react";
import "../styles/taskDetails.css";

export default function TaskDetails({
  task,
  onClose,
  onUpdate,
  onDelete,
  isAdmin,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
  });

  const handleSave = async () => {
    await onUpdate(task._id, editData);
    setIsEditing(false);
  };

  const statuses = ["Pending", "In Progress", "Completed"];
  const nextStatus =
    statuses[(statuses.indexOf(editData.status) + 1) % statuses.length];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Task Details</h2>
          <button className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-content">
          {isEditing ? (
            <form className="edit-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="4"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) =>
                      setEditData({ ...editData, status: e.target.value })
                    }
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={editData.priority}
                    onChange={(e) =>
                      setEditData({ ...editData, priority: e.target.value })
                    }
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>
              </div>
            </form>
          ) : (
            <div className="view-mode">
              <div className="detail-item">
                <span className="detail-label">Title:</span>
                <span className="detail-value">{task.title}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Description:</span>
                <span className="detail-value">
                  {task.description || "No description"}
                </span>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`status-badge status-${task.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Priority:</span>
                  <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority === "high" && "🔴 High"}
                    {task.priority === "medium" && "🟡 Medium"}
                    {task.priority === "low" && "🟢 Low"}
                  </span>
                </div>
              </div>

              {task.assignedTo && (
                <div className="detail-item">
                  <span className="detail-label">Assigned to:</span>
                  <span className="detail-value">{task.assignedTo.name}</span>
                </div>
              )}

              <div className="detail-item">
                <span className="detail-label">Created:</span>
                <span className="detail-value">
                  {new Date(task.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Updated:</span>
                <span className="detail-value">
                  {new Date(task.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {isEditing ? (
            <>
              <button className="btn btn-save" onClick={handleSave}>
                💾 Save Changes
              </button>
              <button
                className="btn btn-cancel"
                onClick={() => setIsEditing(false)}
              >
                ✕ Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-next"
                onClick={() => {
                  const newStatus = nextStatus;
                  onUpdate(task._id, { ...task, status: newStatus });
                  onClose();
                }}
              >
                ➔ Next Status
              </button>
              {isAdmin && (
                <>
                  <button
                    className="btn btn-edit"
                    onClick={() => setIsEditing(true)}
                  >
                    ✎ Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => {
                      if (window.confirm("Delete this task?")) {
                        onDelete(task._id);
                        onClose();
                      }
                    }}
                  >
                    🗑 Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
