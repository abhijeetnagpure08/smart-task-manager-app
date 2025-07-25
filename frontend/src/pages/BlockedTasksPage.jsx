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
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fdfdfd",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  backButton: {
    marginBottom: "20px",
    padding: "8px 14px",
    backgroundColor: "#6c757d",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
  },
};

export default BlockedTasksPage;
