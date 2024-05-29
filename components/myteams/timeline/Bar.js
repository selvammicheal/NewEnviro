import React, { useState, useRef } from "react";
import { MdDragIndicator } from "react-icons/md";

const Bar = ({ fromDate, EndDate, status, length }) => {
  //   console.log(fromDate + "From bar");
  //   console.log(EndDate + "From bar");

  const [isVisible, setVisible] = useState(false);

  setTimeout(() => {
    setVisible(true);
  }, 100);

  let lengther = null;

  if (length) {
    lengther = "2024-03-31";
  } else {
    lengther = "2024-12-31";
  }

  const startDateOfTimeline = new Date("2024-01-1");
  const endDateOfTimeline = new Date(lengther);
  const startDateOfTask = new Date(fromDate);
  const endDateOfTask = new Date(EndDate);

  const totalDaysInTimeline =
    (endDateOfTimeline - startDateOfTimeline) / (1000 * 60 * 60 * 24);

  const daysFromTimelineStartToTaskStart =
    (startDateOfTask - startDateOfTimeline) / (1000 * 60 * 60 * 24);

  const relativePositionOfTask =
    daysFromTimelineStartToTaskStart / totalDaysInTimeline;

  const startPositionOfTaskPercentage = relativePositionOfTask * 100;

  const durationOfTask =
    (endDateOfTask - startDateOfTask) / (1000 * 60 * 60 * 24);

  const relativeWidthOfTask = durationOfTask / totalDaysInTimeline;

  const widthOfTaskPercentage = relativeWidthOfTask * 100;

  const [width, setWidth] = useState(widthOfTaskPercentage);

  const refer = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const clicker = (event) => {
    setIsResizing(true);
    // console.log(event.clientX);
  };
  const mover = (event, mode) => {
    if (!isResizing) {
      return;
    }

    const newWidth = event.clientX + 10;
    const { left } = refer.current.getBoundingClientRect();
    const width = refer.current.offsetWidth;

    const calculation = ((newWidth - left) / width) * 100;

    setWidth(calculation - startPositionOfTaskPercentage);

  };

  const mouseUp = () => {
    setIsResizing(false);
  };

  const statusClasses = {
    Done: "bar-done",
    "In Progress": "bar-in-progress",
    "To Do": "bar-todo",
    "Not Started": "bar-not-started",
  };

  return (
    <div
      className="bar-parent"
      ref={refer}
      onMouseMove={mover}
      onMouseUp={mouseUp}
      onMouseLeave={() => setIsResizing(false)}
    >
      <div
        className={`the-bar ${statusClasses[status]} ${
          isVisible ? "animated-component visible" : "animated-component"
        } its-pointer`}
        style={{
          left: startPositionOfTaskPercentage + "%",
          width: width + "%",
          zIndex: isResizing ? 999 : 0,
        }}
      >
        <div className="drag-button left-drag">
          <MdDragIndicator />
        </div>
        <div className="drag-button right-drag" onMouseDown={clicker}>
          <MdDragIndicator />
        </div>
      </div>
    </div>
  );
};

export default Bar;
