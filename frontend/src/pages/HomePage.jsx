import React, { useEffect, useState } from "react";
import { getTasks, getTasksByUser, getUsers } from "../services/api";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import { toast } from "react-toastify";

const HomePage = () => {
  const [tasks, setTasks] = useState([]); // Tasks assigned to logged-in user
  const [users, setUsers] = useState([]); // All users
  const [allTasks, setAllTasks] = useState([]); // All tasks in the system
  const [filter, setFilter] = useState({ priority: "", status: "" }); // Filter state

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  useEffect(() => {
    if (!user) return navigate("/"); // Redirect to login if no user
    fetchData();
  }, []);

  // Fetch user tasks, all users, and all tasks
  const fetchData = async () => {
    const userTasks = await getTasksByUser(user.id);
    setTasks(userTasks);
    const users = await getUsers();
    setUsers(users);
    const all = await getTasks();
    setAllTasks(all);
  };

  // Filter tasks based on selected priority and status
  const filteredTasks = tasks.filter((t) => {
    return (
      (!filter.priority || t.priority === filter.priority) &&
      (!filter.status || t.status === filter.status)
    );
  });

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Welcome, {user.username}</h2>
        <div style={styles.actions}>
          <button
            style={styles.logoutButton}
            onClick={() => {
              localStorage.removeItem("user");
              toast.success("Logout Successfully");
              navigate("/");
            }}
          >
            Logout
          </button>
          <button
            style={styles.blockedButton}
            onClick={() => navigate("/blocked")}
          >
            Blocked Tasks
          </button>
        </div>
      </div>

      {/* Task creation form */}
      <div style={styles.section}>
        <TaskForm users={users} existingTasks={allTasks} refresh={fetchData} />
      </div>

      {/* Filter bar */}
      <div style={styles.section}>
        <FilterBar filter={filter} setFilter={setFilter} />
      </div>

      {/* Task list */}
      <h3 style={styles.taskHeading}>My Tasks</h3>
      {filteredTasks.length === 0 && (
        <p style={styles.emptyText}>No tasks found.</p>
      )}
      <div style={styles.taskList}>
        {filteredTasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            refresh={fetchData}
            existingTasks={allTasks}
          />
        ))}
      </div>
    </div>
  );
};

// Basic styles
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "10px",
  },
  title: {
    margin: 0,
    fontSize: "22px",
    color: "#333",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  logoutButton: {
    padding: "8px 16px",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  blockedButton: {
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  section: {
    marginBottom: "25px",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  taskHeading: {
    marginBottom: "12px",
    color: "#444",
    fontSize: "18px",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
    marginTop: "10px",
  },
};

export default HomePage;
