import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, createUser } from "../services/api";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Input field for username
  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home");
    }
  }, []);

  // Handle login button click
  const handleLogin = async () => {
    setError("");
    setSuccess("");
    if (!username) return;

    const user = await loginUser(username);
    if (user?.id) {
      // Save user to localStorage and redirect
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } else {
      setError(user?.error); // Show error if login failed
    }
  };

  // Handle register button click
  const handleCreate = async () => {
    setError("");
    setSuccess("");
    if (!username) return;

    const user = await createUser(username);
    if (user?.id) {
      setSuccess("User created successfully"); // Show success
    } else {
      setError(user?.error); // Show error if registration failed
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login / Register</h2>

      <input
        value={username}
        onChange={(e) => {
          setError(""); // Clear error on change
          setUsername(e.target.value);
        }}
        placeholder="Username"
        style={styles.input}
        onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
        onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
      />

      {/* Error or success messages */}
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <div style={styles.buttonGroup}>
        <button style={styles.registerButton} onClick={handleCreate}>
          Register
        </button>
        <button style={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
  },
  heading: {
    marginBottom: "25px",
    color: "#222",
    fontSize: "22px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border 0.3s",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  },
  loginButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#007bff",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  registerButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#28a745",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "#dc3545",
    fontSize: "14px",
    marginBottom: "12px",
  },
  success: {
    color: "#28a745",
    fontSize: "14px",
    marginBottom: "12px",
  },
};

export default LoginPage;
