import React from "react";

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div style={styles.filterContainer}>
      <div style={styles.filterItem}>
        <label style={styles.label}>Priority:</label>
        <select
          style={styles.select}
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
        >
          <option value="">All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div style={styles.filterItem}>
        <label style={{ ...styles.label }}>Status:</label>
        <select
          style={styles.select}
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="">All</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
    </div>
  );
};

const styles = {
  filterContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#f1f5f9",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    fontFamily: "Segoe UI, sans-serif",
  },
  filterItem: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    minWidth: "160px",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "600",
    color: "#333",
    fontSize: "14px",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff",
    fontFamily: "inherit",
  },
};

export default FilterBar;
