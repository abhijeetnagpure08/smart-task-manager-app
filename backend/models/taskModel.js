module.exports = {
   /**
   * Creates a new task object.
   */
    createTaskObject: ({ title, description, priority, status }) => {
      return {
        id: Date.now().toString(),      // Unique task ID (timestamp-based)
        title,                          // Task title
        description,                    // Task description
        priority,                       // Priority: Low / Medium / High
        status,                         // Status: To Do / In Progress / Done
        assignedTo: null,              // User ID the task is assigned to (null by default)
        dependencies: [],              // Array of task IDs this task depends on
      };
    },
  };
  