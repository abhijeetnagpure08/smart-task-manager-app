import React from "react";
import { Routes, Route } from "react-router-dom";

// Import pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BlockedTasksPage from "./pages/BlockedTasksPage";

const App = () => {
  return (
    <Routes>
      {/* Login or Register */}
      <Route path="/" element={<LoginPage />} />

      {/* Dashboard - view and manage tasks */}
      <Route path="/home" element={<HomePage />} />

      {/* View all blocked tasks */}
      <Route path="/blocked" element={<BlockedTasksPage />} />
    </Routes>
  );
};

export default App;
