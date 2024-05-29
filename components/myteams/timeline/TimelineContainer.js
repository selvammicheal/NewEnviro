import React, { useState } from "react";
import Timeline from "./Timeline";
import { CiCircleInfo } from "react-icons/ci";
import { GoCheckCircle } from "react-icons/go";
import { MdOutlineReportProblem } from "react-icons/md";

const TimelineContainer = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const [mode, setMode] = useState("year");

  const handleInfoHover = (isHovering) => {
    setPopupOpen(isHovering);
  };
  return (
    <div>
      <Timeline mode={mode} />
      <div className="my-4 d-flex justify-content-end">
        <div className="page-change-container d-flex">
          <div>
            <div
              className={`timeline-buttons ${
                mode == "week" ? "bg-black text-white" : ""
              }`}
              onClick={() => {
                setMode("week");
              }}
            >
              Week
            </div>
          </div>
          <div>
            <div
              className={`timeline-buttons ${
                mode == "month" ? "bg-black text-white" : ""
              }`}
              onClick={() => {
                setMode("month");
              }}
            >
              Month
            </div>
          </div>
          <div>
            <div
              className={`timeline-buttons ${
                mode == "year" ? "bg-black text-white" : ""
              }`}
              onClick={() => {
                setMode("year");
              }}
            >
              Year
            </div>
          </div>
          <div
            className="timeline-buttons position-relative"
            onMouseEnter={() => handleInfoHover(true)}
            onMouseLeave={() => handleInfoHover(false)}
          >
            <CiCircleInfo className="ciicon" />
            {popupOpen && (
              <div className="popup-container">
                <div>
                  <div className="popup-box">
                    <div className="popup-bars-label">Bars</div>

                    <div className="bars-container">
                      <div className="bars-parent-box">
                        <div className="pdt02">
                          <div className="bar-of-ns" />
                        </div>
                        <div className="pdl02 pdb">Not Started</div>
                      </div>

                      <div className="bars-parent-box">
                        <div className="pdt02">
                          <div className="bar-of-todo" />
                        </div>
                        <div className="pdl02 pdb">To Do</div>
                      </div>

                      <div className="bars-parent-box">
                        <div className="pdt02">
                          <div className="bar-of-progress" />
                        </div>
                        <div className="pdl02 pdb">In Progress</div>
                      </div>

                      <div className="bars-parent-box">
                        <div className="pdt02">
                          <div className="bar-of-done" />
                        </div>
                        <div className="pdl02 pdb">Done</div>
                      </div>
                    </div>

                    <div className="popup-release-container">Releases</div>
                    <div className="popup-icon-container">
                      <div className="bars-parent-box">
                        <div className="pdt02">
                          <GoCheckCircle className="check-circle-outline" />
                        </div>
                        <div className="pdl02 pdb">Released/Completed</div>
                      </div>

                      <div className="bars-parent-box">
                        <div className="pdt02">
                          <MdOutlineReportProblem className="report-problem-outline" />
                        </div>
                        <div className="pdl02 pdb">Overdue/Error</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineContainer;
