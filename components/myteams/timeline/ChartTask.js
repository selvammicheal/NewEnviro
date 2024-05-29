import React, { useState } from "react";
import ChartSubtask from "./ChartSubtask";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { LuScrollText } from "react-icons/lu";
import Status from "./status/Status";
import Bar from "./Bar";

const ChartTask = ({
  el,
  childIndex,
  parentIndex,
  toggleEpic,
  showHide,
  index,
}) => {
  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center py-1 mrl06"
        draggable
      >
        <div className="info">
          <div
            className="task d-flex align-items-center its-pointer"
            onClick={() => {
              toggleEpic(parentIndex, childIndex);
            }}
          >
            {el.subtask && (
              <>
                {!showHide[index].visible ? (
                  <FaChevronRight className="task-toggle-button" />
                ) : (
                  <FaChevronDown className="task-toggle-button" />
                )}
              </>
            )}
            <LuScrollText className="luscroll-timeline" />
            <p className="mrl04 font08 task-name-container">{el.Name}</p>
          </div>
        </div>
        <div className="status-container">
          <Status status={el.status} />
        </div>
      </div>
      {showHide[index].visible &&
        el.subtask &&
        el.subtask.map((ell, ind) => (
          <ChartSubtask
            key={ind}
            el={ell}
            parentInde={parentIndex}
            childIndex={childIndex}
          />
        ))}
    </>
  );
};

export default ChartTask;
