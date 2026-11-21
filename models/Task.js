
import mongoose from "mongoose";

// Membuat struktur data Task
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true
    },

    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true
    },

    deadline: {
      type: Date,
      required: [true, "Task deadline is required"]
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium"
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

// Membuat dan mengekspor Model
const Task = mongoose.model("Task", taskSchema);

export default Task;
