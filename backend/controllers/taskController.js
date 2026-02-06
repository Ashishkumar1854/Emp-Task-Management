const Task = require("../models/Task");
const mongoose = require("mongoose");

// Helper: Check if string is valid MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const data = {
      title,
      description: description || "",
      createdBy: req.user._id,
      status: "Pending",
      priority:
        priority && ["low", "medium", "high"].includes(priority)
          ? priority
          : "medium",
    };

    // Only add assignedTo if it's a valid ObjectId
    if (assignedTo && assignedTo.trim() && isValidObjectId(assignedTo)) {
      data.assignedTo = assignedTo;
    } else if (assignedTo && assignedTo.trim()) {
      // Invalid ObjectId format
      return res.status(400).json({
        message: "Invalid user ID format. Please select a valid user.",
      });
    }

    const task = await Task.create(data);
    await task.populate("assignedTo", "name email");
    await task.populate("createdBy", "name email");
    res.json(task);
  } catch (err) {
    console.error("Task creation error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    res.json(tasks);
  } catch (err) {
    console.error("Get all tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAssigned = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id }).populate(
      "assignedTo",
      "name",
    );
    res.json(tasks);
  } catch (err) {
    console.error("Get assigned tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Not found" });

    // if user is not admin and not the assigned user, forbid
    if (
      req.user.role !== "admin" &&
      String(task.assignedTo) !== String(req.user._id)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(task, req.body);
    await task.save();
    await task.populate("assignedTo", "name email");
    res.json(task);
  } catch (err) {
    console.error("Update task error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Not found" });
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });
    await task.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
