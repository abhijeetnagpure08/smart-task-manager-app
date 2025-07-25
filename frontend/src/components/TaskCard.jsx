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
      {isEditing ? (
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
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  text: {
    margin: "4px 0",
    fontSize: "14px",
    color: "#555",
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
    fontFamily: "inherit", // Ensures consistent font
  },
  select: {
    padding: "8px",
    fontSize: "14px",
    width: "100%",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  primaryButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#ffc107",
    color: "#000",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  completeButton: {
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  editSection: {
    display: "flex",
    flexDirection: "column",
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
};

export default TaskCard;
