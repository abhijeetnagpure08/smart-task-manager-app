import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, createUser } from "../services/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");   // Input field for username
  const [error, setError] = useState("");         // Error message
  const [success, setSuccess] = useState("");     // Success message
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
        <button style={styles.button} onClick={handleCreate}>Register</button>
        <button style={styles.button} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none",
  transition: "border 0.3s",
  fontFamily: "inherit",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  button: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#007bff",
    border: "none",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    marginBottom: "10px",
  },
};

export default LoginPage;
