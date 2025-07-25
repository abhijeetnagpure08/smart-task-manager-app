

const store = require("../store");

/**
 * Create a new user with a unique username.
 * Stores user in the in-memory store.
 */
exports.createUser = (req, res) => {
  const { username } = req.body;

  // Validate input
  if (!username) return res.status(400).json({ error: "Username required" });

  // Check if user already exists
  const exists = store.users.find((u) => u.username === username);
  if (exists) return res.status(409).json({ error: "User already exists" });

  // Create new user object
  const newUser = {
    id: Date.now().toString(), // simple unique ID
    username,
  };

  // Add user to in-memory store
  store.users.push(newUser);

  // Return created user
  res.status(201).json(newUser);
};

/**
 * Mock login for a user based on username.
 * No password, just checks if user exists.
 */
exports.loginUser = (req, res) => {
  const { username } = req.body;

  // Find user by username
  const user = store.users.find((u) => u.username === username);

  // If not found, return 401
  if (!user) return res.status(401).json({ error: "User not found" });

  // Return user object
  res.json(user);
};

/**
 * Get a list of all registered users.
 */
exports.getUsers = (req, res) => {
  res.json(store.users);
};
