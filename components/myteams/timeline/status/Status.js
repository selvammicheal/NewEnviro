import React from "react";

const Status = ({ status }) => {
  const color = {
    "To Do": "#45C1FF",
    "Not Started": "#88898A",
    "In Progress": "#FFB240",
    Done: "#4BC766",
  };
  return (
    <span
      className="status-timeline-info"
      style={{
        backgroundColor: color[status],
      }}
    >
      {status}
    </span>
  );
};

export default Status;
