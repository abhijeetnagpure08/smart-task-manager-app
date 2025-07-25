import React, { useState } from "react";
import { createTask, assignTask, addDependencies } from "../services/api";
import { toast } from "react-toastify";

const TaskForm = ({ users, existingTasks, refresh }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    assignedTo: "",
    dependencies: [],
  });

  const toggleDependency = (taskId) => {
    const updated = form.dependencies.includes(taskId)
      ? form.dependencies.filter((id) => id !== taskId)
      : [...form.dependencies, taskId];
    setForm({ ...form, dependencies: updated });
  };

  const handleSubmit = async () => {
    // Check all fields are filled
    if (!form.title || !form.priority || !form.status || !form.assignedTo) {
      toast.error("Please fill all fields");
      return;
    }

    const newTask = await createTask(form);
    toast.success("Task created successfully")
    if (form.assignedTo) {
      await assignTask(newTask.id, form.assignedTo);
    }
    if (form.dependencies.length) {
      await addDependencies(newTask.id, form.dependencies);
    }

    refresh();
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "To Do",
      assignedTo: "",
      dependencies: [],
    });
  };

  return (
    <div style={styles.formContainer}>
      <h4 style={styles.heading}>Create Task</h4>

      <input
        style={styles.input}
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        style={styles.textarea}
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <div style={styles.selectGroup}>
        <select
          style={styles.select}
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          style={styles.select}
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          style={styles.select}
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        >
          <option value="">Assign User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.dependencies}>
        <p style={styles.sectionLabel}>Dependencies (optional):</p>
        {existingTasks.map((task) => (
          <label key={task.id} style={styles.checkboxLabel}>
            <input
              type="checkbox"
              value={task.id}
              checked={form.dependencies.includes(task.id)}
              onChange={() => toggleDependency(task.id)}
              style={styles.checkbox}
            />
            {task.title}
          </label>
        ))}
      </div>

      <button style={styles.button} onClick={handleSubmit}>
        Create Task
      </button>
    </div>
  );
};

// Inline styles
const styles = {
  formContainer: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  heading: {
    marginBottom: "15px",
    fontSize: "18px",
    color: "#333",
  },
  input: {
  padding: "8px",
  fontSize: "14px",
  width: "100%",
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
  lineHeight: "1.5",
  fontFamily: "inherit",
  },
  textarea: {
    padding: "10px",
    fontSize: "14px",
    width: "100%",
    minHeight: "70px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
    boxSizing: "border-box",
    fontFamily: "inherit",
    lineHeight: "1.5",
  },
  selectGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  select: {
    flex: "1",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minWidth: "150px",
  },
  dependencies: {
    marginBottom: "15px",
  },
  sectionLabel: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  checkboxLabel: {
    display: "block",
    fontSize: "14px",
    marginBottom: "4px",
  },
  checkbox: {
    marginRight: "8px",
  },
  button: {
    padding: "10px 16px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default TaskForm;
