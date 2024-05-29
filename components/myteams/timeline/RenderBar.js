import React, { useEffect, useRef } from "react";
import Bar from "./Bar";
import { IoMdArrowDropdown } from "react-icons/io";

const RenderBar = ({ timelineData, showHide, length }) => {
  const ref = useRef();

  let currentMonth;
  let firstDay;
  let lastDay;

  if (length) {
    const time = new Date();
    const year = time.getFullYear();
    const curmon = time.getMonth();
    currentMonth = curmon + 1;
    firstDay = new Date(year, curmon, 1);
    lastDay = new Date(year, curmon + 1, 0);
  }

  const startDateOfTimeline = new Date(!length ? "2024-01-01" : firstDay);
  const endDateOfTimeline = new Date(!length ? "2024-12-31" : lastDay);
  const startDateOfLine = new Date();

  const totalDaysInTimeline =
    (endDateOfTimeline - startDateOfTimeline) / (1000 * 60 * 60 * 24);

  const daysFromTimelineStartToLineStart =
    (startDateOfLine - startDateOfTimeline) / (1000 * 60 * 60 * 24);

  const relativePositionOfLine =
    daysFromTimelineStartToLineStart / totalDaysInTimeline;

  const startPositionOfLinePercentage = relativePositionOfLine * 100;

  useEffect(() => {
    if (!length) {
      const scrollOptions = {
        behavior: "smooth",
        block: "center",
        inline: "center",
      };
      ref.current.scrollIntoView(scrollOptions);
    }
  }, []);

  return (
    <div className="bar-container">
      <div className="bar-box">
        {timelineData.map((el, ind) => (
          <div className="py-4 sub-parent sub-parent-extra">
            <div key={ind}>
              <Bar
                fromDate={el.fromDate}
                EndDate={el.endDate}
                status={el.status}
                length={length}
              />
            </div>
            {showHide[ind].visible &&
              el.task.map((ell, indd) => (
                <React.Fragment key={indd}>
                  <div>
                    <Bar
                      fromDate={ell.fromDate}
                      EndDate={ell.endDate}
                      status={ell.status}
                      length={length}
                    />
                  </div>
                  {showHide[ind].task[indd].visible &&
                    ell.subtask.map((elll, indd) => (
                      <React.Fragment key={indd}>
                        <div key={indd}>
                          <Bar
                            fromDate={elll.fromDate}
                            EndDate={elll.endDate}
                            status={elll.status}
                            length={length}
                          />
                        </div>
                      </React.Fragment>
                    ))}
                </React.Fragment>
              ))}
          </div>
        ))}
      </div>
      {!length ? (
        <div className="grill-container">
          <div className="chartbox-boxes jan">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes feb">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes mar">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes apr">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes may">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes jun">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes jul">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes aug">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes sep">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes oct">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes nov">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
          <div className="chartbox-boxes dec">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
        </div>
      ) : (
        <div className="grill-container">
          <div className="chartbox-boxes single">
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
            <div className="chartbox-child"></div>
          </div>
        </div>
      )}
      <div
        className="current-line"
        ref={ref}
        style={{ left: startPositionOfLinePercentage + "%" }}
      >
        <IoMdArrowDropdown className="dropdown-line" />
      </div>
    </div>
  );
};

export default RenderBar;
