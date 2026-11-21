
import express from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask
} from "../controllers/taskController.js";

// Membuat router
const router = express.Router();

// CREATE: Menambahkan tugas
router.post("/", createTask);

// READ: Menampilkan semua tugas
router.get("/", getTasks);

// READ: Menampilkan detail tugas berdasarkan ID
router.get("/:id", getTaskById);

// UPDATE: Mengubah seluruh data tugas
router.put("/:id", updateTask);

// UPDATE: Mengubah status tugas
router.patch("/:id/status", updateTaskStatus);

// DELETE: Menghapus tugas
router.delete("/:id", deleteTask);

export default router;
