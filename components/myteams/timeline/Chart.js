"use client";
import React, { useEffect, useState } from "react";
import ChartEpic from "./ChartEpic";

const Chart = ({ timelineData, toggleEpic, showHide }) => {
  // const [expandCollapse, setExCol] = useState({});

  // const logger = (index) => setExCol({ ...expandCollapse, [index]: {} });

  // useEffect(() => console.log(expandCollapse), [expandCollapse]);

  return (
    <div className="over-auto">
      {timelineData.map((el, index) => {
        // logger(index);
        return (
          <div className="sub-parent p-2 py-4 sub-parent-extra" key={index}>
            <ChartEpic
              el={el}
              index={index}
              toggleEpic={toggleEpic}
              showHide={showHide}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Chart;
