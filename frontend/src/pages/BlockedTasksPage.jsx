import React, { useEffect, useState } from "react";
import { getBlockedTasks, getTasks } from "../services/api";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

const BlockedTasksPage = () => {
  const navigate = useNavigate();
  const [blocked, setBlocked] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getBlockedTasks();
      console.log(res);
      setBlocked(res || []);
      const all = await getTasks();
      setAllTasks(all);
    })();
  }, []);

  return (
    <div style={styles.container}>
      {/* Back button */}
      <button style={styles.backButton} onClick={() => navigate("/home")}>
        ← Back to Home
      </button>

      <h2 style={styles.heading}>Blocked Tasks</h2>

      {blocked.length === 0 && (
        <p style={styles.emptyText}>No blocked tasks found.</p>
      )}

      <div style={styles.taskList}>
        {blocked.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            existingTasks={allTasks}
            refresh={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#333",
    fontSize: "22px",
    fontWeight: "600",
  },
  backButton: {
    marginBottom: "20px",
    padding: "10px 16px",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    fontSize: "15px",
    marginTop: "10px",
  },
};

export default BlockedTasksPage;
