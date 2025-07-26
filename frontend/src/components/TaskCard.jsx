import { toast } from "react-toastify";
import { updateTask, deleteTask, markTaskComplete } from "../services/api";
import { useState } from "react";

const TaskCard = ({ task, refresh, existingTasks }) => {
  const [isEditing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );
  const [editStatus, setEditStatus] = useState(task.status);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDependencies, setEditDependencies] = useState(
    task.dependencies || []
  );

  const getDependencyTitles = () => {
    return task.dependencies
      ?.map((id) => existingTasks?.find((t) => t.id === id)?.title || "Unknown")
      .join(", ");
  };

  const handleComplete = async () => {
    const res = await markTaskComplete(task.id);
    if (!res.error) refresh();
    else toast.error(res.error);
  };

  const toggleDependency = (taskId) => {
    setEditDependencies((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleUpdate = async () => {
    await updateTask(task.id, {
      ...task,
      title: editTitle,
      description: editDescription,
      status: editStatus,
      priority: editPriority,
      dependencies: editDependencies,
    });
    setEditing(false);
    toast.success("Task edited successfully");
    refresh();
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    toast.success("Deleted Successfully");
    refresh();
  };

  return (
    <div style={styles.cardContainer}>
      {isEditing ? ( //Conditional Rendering to view and edit the task
        <div style={styles.editSection}>
          <input
            style={styles.input}
            placeholder="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            style={{ ...styles.input, height: "60px", resize: "vertical" }}
            placeholder="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <div style={styles.selectGroup}>
            <select
              style={styles.select}
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              style={styles.select}
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div style={styles.dependencies}>
            <p style={styles.sectionLabel}>Dependencies:</p>
            {existingTasks
              .filter((t) => t.id !== task.id) // prevent setting self as dependency
              .map((t) => (
                <label key={t.id} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={t.id}
                    checked={editDependencies.includes(t.id)}
                    onChange={() => toggleDependency(t.id)}
                    style={styles.checkbox}
                  />
                  {t.title}
                </label>
              ))}
          </div>

          <div style={styles.buttonGroup}>
            <button style={styles.primaryButton} onClick={handleUpdate}>
              Save
            </button>
            <button
              style={styles.cancelButton}
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h4 style={styles.title}>{task.title}</h4>
          {task.description && (
            <p style={styles.text}>
              <strong>Description:</strong> {task.description}
            </p>
          )}
          <p style={styles.text}>
            <strong>Status:</strong> {task.status}
          </p>
          <p style={styles.text}>
            <strong>Priority:</strong> {task.priority}
          </p>
          {task.dependencies?.length > 0 && (
            <p style={styles.text}>
              <strong>Blocked by:</strong> {getDependencyTitles()}
            </p>
          )}
          <div style={styles.buttonGroup}>
            <button style={styles.editButton} onClick={() => setEditing(true)}>
              Edit
            </button>
            <button style={styles.deleteButton} onClick={handleDelete}>
              Delete
            </button>
            <button
              style={{
                ...styles.completeButton,
                backgroundColor: task.status === "Done" ? "#ccc" : "#28a745",
                cursor: task.status === "Done" ? "not-allowed" : "pointer",
              }}
              disabled={task.status === "Done"}
              onClick={handleComplete}
            >
              Mark Complete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  cardContainer: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    margin: "0 0 10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#222",
  },
  text: {
    margin: "6px 0",
    fontSize: "15px",
    color: "#444",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    width: "100%",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  selectGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
    flexWrap: "wrap",
  },
  select: {
    flex: 1,
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
    fontFamily: "inherit",
  },
  editSection: {
    display: "flex",
    flexDirection: "column",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "12px",
  },
  primaryButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    color: "white",
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#ffc107",
    color: "#000",
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  completeButton: {
    color: "white",
    padding: "10px 14px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  dependencies: {
    marginBottom: "10px",
  },
  sectionLabel: {
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#333",
  },
  checkboxLabel: {
    display: "block",
    fontSize: "14px",
    marginBottom: "4px",
  },
  checkbox: {
    marginRight: "8px",
  },
};

export default TaskCard;
