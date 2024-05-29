import React, { useState } from "react";
import ChartTask from "./ChartTask";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const ChartEpic = ({ el, index, toggleEpic, showHide }) => {
  const [open, setOpen] = useState(true);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <>
      <div
        className={`d-flex justify-content-between py-1 info-task-container`}
        draggable
      >
        <div
          className="epic d-flex align-items-center its-pointer"
          onClick={() => {
            toggleEpic(index);
          }}
        >
          {!showHide[index].visible ? (
            <FaChevronRight className="task-toggle-button" />
          ) : (
            <FaChevronDown className="task-toggle-button" />
          )}
          <p className="font09 mrl04 epic-name-container">{el.Name}</p>
        </div>
        <div className="info-icon-container">
          <BootstrapTooltip
            title="To Do - 5  |  In Progress - 8  |  Done - 8"
            placement="top"
          >
            <button className="ciicon-timeline-container">
              <CiCircleInfo className="ciicon-timeline" />
            </button>
          </BootstrapTooltip>
        </div>
      </div>
      {showHide[index].visible &&
        el.task.map((ell, ind) => (
          <ChartTask
            key={ind}
            el={ell}
            index={ind}
            showHide={showHide[index].task}
            parentIndex={index}
            childIndex={ind}
            toggleEpic={toggleEpic}
          />
        ))}
    </>
  );
};

export default ChartEpic;
