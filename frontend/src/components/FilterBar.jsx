import React from "react";

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div style={styles.filterContainer}>
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

      <label style={{ ...styles.label, marginLeft: "15px" }}>Status:</label>
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
  );
};

const styles = {
  filterContainer: {
    margin: "10px 0",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  select: {
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minWidth: "120px",
  },
};

export default FilterBar;
