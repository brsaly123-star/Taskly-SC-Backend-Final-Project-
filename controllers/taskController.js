
import mongoose from "mongoose";
import Task from "../models/Task.js";

// ==========================================
// 1. CREATE TASK
// POST /api/tasks
// ==========================================

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;

    const newTask = await Task.create({
      title,
      description,
      deadline,
      priority
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask
    });

  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message
    });
  }
};


// ==========================================
// 2. GET ALL TASKS
// GET /api/tasks
// ==========================================

export const getTasks = async (req, res) => {
  try {
    const { search, priority, status } = req.query;

    const filter = {};

    // Search berdasarkan judul
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i"
      };
    }

    // Filter berdasarkan prioritas
    if (priority) {
      filter.priority = priority;
    }

    // Filter berdasarkan status
    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      total: tasks.length,
      data: tasks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks",
      error: error.message
    });
  }
};


// ==========================================
// 3. GET TASK BY ID
// GET /api/tasks/:id
// ==========================================

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID"
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve task",
      error: error.message
    });
  }
};


// ==========================================
// 4. UPDATE TASK
// PUT /api/tasks/:id
// ==========================================

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID"
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask
    });

  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message
    });
  }
};


// ==========================================
// 5. UPDATE TASK STATUS
// PATCH /api/tasks/:id/status
// ==========================================

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID"
      });
    }

    const validStatuses = [
      "Pending",
      "In Progress",
      "Completed"
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Use Pending, In Progress, or Completed."
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: updatedTask
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update task status",
      error: error.message
    });
  }
};


// ==========================================
// 6. DELETE TASK
// DELETE /api/tasks/:id
// ==========================================

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID"
      });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message
    });
  }
};
