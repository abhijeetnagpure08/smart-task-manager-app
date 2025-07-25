const API = "http://localhost:5000/api";

export const loginUser = async (username) => {
  const res = await fetch(`${API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  return res.json();
};

export const createUser = async (username) => {
  const res = await fetch(`${API}/users/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  return res.json();
};

export const getUsers = async () => {
  const res = await fetch(`${API}/users`);
  return res.json();
};

export const getTasks = async () => {
  const res = await fetch(`${API}/tasks`);
  return res.json();
};

export const getTasksByUser = async (userId) => {
  const res = await fetch(`${API}/tasks/user/${userId}`);
  return res.json();
};

export const getBlockedTasks = async () => {
  const res = await fetch(`${API}/tasks/blocked`);
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(`${API}/tasks/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${API}/tasks/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const assignTask = async (id, userId) => {
  const res = await fetch(`${API}/tasks/assign/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return res.json();
};

export const markTaskComplete = async (id) => {
  const res = await fetch(`${API}/tasks/complete/${id}`, { method: "PUT" });
  return res.json();
};
 
export const deleteTask = async (id) => {
  const res = await fetch(`${API}/tasks/delete/${id}`, { method: "DELETE" });
  return res.json();
};


export const addDependencies = async (id, dependencyIds) => {
  const res = await fetch(`${API}/tasks/dependencies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dependencyIds }),
  });
  return res.json();
};
