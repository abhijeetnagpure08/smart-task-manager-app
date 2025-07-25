const store = require("../store");
const { createTaskObject } = require("../models/taskModel");

/**
 * Create a new task and add it to in-memory store.
 */
exports.createTask = (req, res) => {
  const { title, description, priority, status } = req.body;

  // Validate required fields
  if (!title || !priority || !status || !description)
    return res.status(400).json({ error: "Missing fields" });

  // Create a task object
  const task = createTaskObject({ title, description, priority, status });

  // Add task to in-memory store
  store.tasks.push(task);

  // Return created task
  res.status(201).json(task);
};

/**
 * Get all tasks from the in-memory store.
 */
exports.getAllTasks = (req, res) => {
  res.json(store.tasks);
};

/**
 * Update an existing task by ID.
 */
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority } = req.body;

  // Find task by ID
  const task = store.tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  // Update allowed fields explicitly
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;

  res.json(task);
};

/**
 * Delete a task by ID.
 */
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  // Find task index
  const index = store.tasks.findIndex((t) => t.id === id);

  if (index === -1) return res.status(404).json({ error: "Task not found" });

  // Remove task from array
  store.tasks.splice(index, 1);

  res.json({ message: "Task deleted" });
};

/**
 * Assign a task to a user.
 */
exports.assignTask = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  // Find task and user
  const task = store.tasks.find((t) => t.id === id);
  const user = store.users.find((u) => u.id === userId);

  if (!task || !user) return res.status(404).json({ error: "Task or user not found" });

  // Assign task
  task.assignedTo = userId;

  res.json(task);
};

/**
 * Add dependency task IDs to a given task.
 */
exports.addDependencies = (req, res) => {
  const { id } = req.params;
  const { dependencyIds } = req.body;

  // Find task
  const task = store.tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  // Save dependencies
  task.dependencies = dependencyIds;

  res.json(task);
};

/**
 * Mark a task as complete only if all its dependencies are completed.
 */
exports.markTaskComplete = (req, res) => {
  const { id } = req.params;

  // Find task
  const task = store.tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  // Check if any dependency is still incomplete
  const blocked = task.dependencies.some((depId) => {
    const depTask = store.tasks.find((t) => t.id === depId);
    return depTask && depTask.status !== "Done";
  });

  if (blocked)
    return res.status(400).json({ error: "Cannot complete. Dependencies not done." });

  // Mark task as done
  task.status = "Done";

  res.json(task);
};

/**
 * Get all tasks assigned to a specific user.
 */
exports.getTasksByUser = (req, res) => {
  const { userId } = req.params;

  // Filter tasks assigned to user
  const tasks = store.tasks.filter((t) => t.assignedTo === userId);

  res.json(tasks);
};

/**
 * Get all tasks that are currently blocked by incomplete dependencies.
 */
exports.getBlockedTasks = (req, res) => {
  const blockedTasks = store.tasks.filter((task) =>
    task.dependencies.some((depId) => {
      const depTask = store.tasks.find((t) => t.id === depId);
      return depTask && depTask.status !== "Done";
    })
  );
  res.json(blockedTasks);
};
