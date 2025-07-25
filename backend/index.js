const express = require("express");
const cors = require("cors");
const app = express();

// import all routes 
const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json());

// routes 
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// listen port on port 5000
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
