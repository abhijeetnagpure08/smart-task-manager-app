const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
  assignTask,
  addDependencies,
  markTaskComplete,
  getTasksByUser,
  getBlockedTasks,
  getAllTasks
} = require("../controllers/taskController");

// =======================
// Task Routes
// =======================

router.get("/", getAllTasks);
router.post("/create", createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);
router.put("/assign/:id", assignTask);
router.put("/dependencies/:id", addDependencies);
router.put("/complete/:id", markTaskComplete);
router.get("/user/:userId", getTasksByUser);
router.get("/blocked", getBlockedTasks);

module.exports = router;
