import React from "react";
import "../styles/taskItem-modern.css";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "In Progress":
        return "status-progress";
      case "Completed":
        return "status-completed";
      default:
        return "";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "🔴 High";
      case "medium":
        return "🟡 Medium";
      case "low":
        return "🟢 Low";
      default:
        return "Medium";
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <div>
          <h3 className="task-title">{task.title}</h3>
          <span className={`status-badge ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
        <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
          {getPriorityLabel(task.priority)}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        {task.assignedTo && (
          <div className="meta-row">
            <span className="meta-label">Assigned to:</span>
            <span className="meta-value">{task.assignedTo.name}</span>
          </div>
        )}
        {task.createdAt && (
          <div className="meta-row">
            <span className="meta-label">Created:</span>
            <span className="meta-value">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div className="task-actions">
        {onUpdate && (
          <button className="btn-action btn-update" onClick={onUpdate}>
            ➔ Next Status
          </button>
        )}
        {onDelete && (
          <button className="btn-action btn-delete" onClick={onDelete}>
            🗑 Delete
          </button>
        )}
      </div>
    </div>
  );
}
