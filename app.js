
import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Route utama
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Taskly API!",
    description: "Student Task Management REST API"
  });
});

// Menghubungkan Task Routes
app.use("/api/tasks", taskRoutes);

export default app;
