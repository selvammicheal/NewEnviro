import React, { useState } from "react";
import { LuTextQuote } from "react-icons/lu";
import Status from "./status/Status";
import Bar from "./Bar";

const ChartSubtask = ({ el }) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center py-1 subtask-name-box"
      draggable
    >
      <div className="info">
        <div className="d-flex align-items-center">
          <LuTextQuote className="lutextquote-timeline-subtask" />
          <p className="mrl04 font08 subtask-name-container">{el.Name}</p>
        </div>
      </div>
      <div className="status-container">
        <Status status={el.status} />
      </div>
    </div>
  );
};

export default ChartSubtask;
