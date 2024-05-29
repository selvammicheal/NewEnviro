import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import RenderBar from "./RenderBar";

const Timeline = ({ mode }) => {
  const timelineData = [
    {
      Name: "Epic (1)",
      progress: "80%",
      fromDate: "1jan2024",
      endDate: "31mar2024",
      status: "Done",
      task: [
        {
          Name: "Task 1",
          progress: "80%",
          status: "Done",
          fromDate: "1jan2024",
          endDate: "12feb2024",
          subtask: [
            {
              Name: "Subtask 1",
              progress: "100%",
              status: "To Do",
              fromDate: "15jan2024",
              endDate: "20mar2024",
            },
            {
              Name: "Subtask 2",
              progress: "80%",
              status: "Not Started",
              fromDate: "19feb2024",
              endDate: "14mar2024",
            },
          ],
        },
        {
          Name: "Task 2",
          progress: "80%",
          status: "In Progress",
          fromDate: "2jan2024",
          endDate: "26feb2024",
          subtask: [
            {
              Name: "Subtask 1",
              progress: "100%",
              status: "In Progress",
              fromDate: "24jan2024",
              endDate: "14feb2024",
            },
            {
              Name: "Subtask 2",
              progress: "80%",
              status: "Done",
              fromDate: "14feb2024",
              endDate: "14mar2024",
            },
          ],
        },
      ],
    },
    {
      Name: "Epic (2)",
      progress: "80%",
      fromDate: "10feb2024",
      endDate: "14mar2024",
      status: "In Progress",
      task: [
        {
          Name: "Task 1",
          progress: "80%",
          status: "Done",
          fromDate: "10feb2024",
          endDate: "10mar2024",
          subtask: [
            {
              Name: "Subtask 1",
              progress: "100%",
              status: "To Do",
              fromDate: "20jan2024",
              endDate: "12feb2024",
            },
            {
              Name: "Subtask 2",
              progress: "80%",
              status: "Not Started",
              fromDate: "18jan2024",
              endDate: "04feb2024",
            },
          ],
        },
        {
          Name: "Task 2",
          progress: "80%",
          status: "In Progress",
          fromDate: "4jan2024",
          endDate: "4feb2024",
          subtask: [
            {
              Name: "Subtask 1",
              progress: "100%",
              status: "In Progress",
              fromDate: "30jan2024",
              endDate: "10mar2024",
            },
            {
              Name: "Subtask 2",
              progress: "80%",
              status: "Done",
              fromDate: "10feb2024",
              endDate: "14mar2024",
            },
          ],
        },
      ],
    },
  ];

  const timelineDataYear = [
    {
      Name: "Epic (1)",
      progress: "80%",
      fromDate: "1jan2024",
      endDate: "31oct2024",
      status: "Done",
      task: [
        {
          Name: "Task 1",
          progress: "80%",
          status: "Done",
          fromDate: "1jan2024",
          endDate: "12may2024",
          subtask: [
            {
              Name: "Subtask 1",
              progress: "100%",
              status: "To Do",
              fromDate: "15jan2024",
              endDate: "20sep2024",
            },
            {
              Name: "Subtask 2",
              progress: "80%",
              status: "Not Started",
              fromDate: "19may2024",
              endDate: "14aug2024",
            },
          ],
        },
        {
          Name: "Task 2",
          progress: "80%",
          status: "In Progress",
          fromDate: "2jan2024",
          endDate: "26sep2024",
          subtask: [
            {
              Name: "Subtask 1",
              progress: "100%",
              status: "In Progress",
              fromDate: "24sep2024",
              endDate: "14nov2024",
            },
            {
              Name: "Subtask 2",
              progress: "80%",
              status: "Done",
              fromDate: "14feb2024",
              endDate: "14mar2024",
            },
          ],
        },
      ],
    },
    {
      Name: "Epic (2)",
      progress: "80%",
      fromDate: "10feb2024",
      endDate: "14sep2024",
      status: "In Progress",
      task: [
        {
          Name: "Task 1",
          progress: "80%",
          status: "Done",
          fromDate: "10feb2024",
          endDate: "10oct2024",
          subtask: [
            {
              Name: "Subtask 1",
              progress: "100%",
              status: "To Do",
              fromDate: "20jan2024",
              endDate: "12nov2024",
            },
            {
              Name: "Subtask 2",
              progress: "80%",
              status: "Not Started",
              fromDate: "18may2024",
              endDate: "04aug2024",
            },
          ],
        },
        {
          Name: "Task 2",
          progress: "80%",
          status: "In Progress",
          fromDate: "4jan2024",
          endDate: "4feb2024",
          subtask: [
            {
              Name: "Subtask 1",
              progress: "100%",
              status: "In Progress",
              fromDate: "30jan2024",
              endDate: "10may2024",
            },
            {
              Name: "Subtask 2",
              progress: "80%",
              status: "Done",
              fromDate: "10feb2024",
              endDate: "14apr2024",
            },
          ],
        },
      ],
    },
  ];

  const month = new Date().getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [showHide, setShowHide] = useState(null);

  useEffect(() => {
    const initialShowHide = timelineData.map((epic) => ({
      visible: true,
      task: epic.task.map((task) => ({ visible: true })),
    }));
    setShowHide(initialShowHide);
  }, []);

  const toggleShow = (parentIndex, childIndex) => {
    const temp = [...showHide];

    if (parentIndex != null && childIndex != null) {
      temp[parentIndex].task[childIndex].visible =
        !temp[parentIndex].task[childIndex].visible;
    } else {
      temp[parentIndex].visible = !temp[parentIndex].visible;
    }

    setShowHide(temp);
  };
  return (
    <>
      {mode == "year" && (
        <div className="parentp">
          <div className="left">
            <div className="info-menu">
              <div className="timep p-4 ">Years</div>
              <div className="timespanip p-3">Milestone</div>
              <div className="project-container">
                {showHide && (
                  <Chart
                    timelineData={timelineDataYear}
                    toggleEpic={toggleShow}
                    showHide={showHide}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="right-boxer">
              <div className="content-menu">
                <div className="timespanp d-flex justify-content-between">
                  <div className="months-data py-4 jan">January</div>
                  <div className="months-data py-4 feb">February</div>
                  <div className="months-data py-4 mar">March</div>
                  <div className="months-data py-4 apr">April</div>
                  <div className="months-data py-4 may">May</div>
                  <div className="months-data py-4 jun">June</div>
                  <div className="months-data py-4 jul">July</div>
                  <div className="months-data py-4 aug">August</div>
                  <div className="months-data py-4 sep">September</div>
                  <div className="months-data py-4 oct">October</div>
                  <div className="months-data py-4 nov">November</div>
                  <div className="months-data py-4 dec">December</div>
                </div>
                <div className="timespan-content d-flex justify-content-between">
                  <div className="spaner jan py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner feb py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner mar py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner apr py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner may py-3">
                    <div className="spaner-text active">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner jun py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner jul py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner aug py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner sep py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner oct py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner nov py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner dec py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                </div>
                <div className="chartbox-parent">
                  {showHide && (
                    <RenderBar
                      timelineData={timelineDataYear}
                      showHide={showHide}
                      from={"years"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {mode == "month" && (
        <div className="parentp">
          <div className="left">
            <div className="info-menu">
              <div className="timep p-4">Months</div>
              <div className="timespanip p-3">Milestone</div>
              <div className="project-container">
                {showHide && (
                  <Chart
                    timelineData={timelineDataYear}
                    toggleEpic={toggleShow}
                    showHide={showHide}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="right-boxer">
              <div className="content-menu">
                <div className="timespanp d-flex justify-content-between">
                  <div className="months-data py-4 jan">
                    January
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 feb">
                    February
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 mar">
                    March
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 apr">
                    April
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 may">
                    May
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 jun">
                    June
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 jul">
                    July
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 aug">
                    August
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 sep">
                    September
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 oct">
                    October
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 nov">
                    November
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                  <div className="months-data py-4 dec">
                    December
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                </div>
                <div className="timespan-content d-flex justify-content-between">
                  <div className="spaner jan py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner feb py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner mar py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner apr py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner may py-3">
                    <div className="spaner-text active">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner jun py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner jul py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner aug py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner sep py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner oct py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner nov py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                  <div className="spaner dec py-3">
                    <div className="spaner-text">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                </div>
                <div className="chartbox-parent">
                  {showHide && (
                    <RenderBar
                      timelineData={timelineDataYear}
                      showHide={showHide}
                      from={"years"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {mode == "week" && (
        <div className="parentp">
          <div className="left">
            <div className="info-menu">
              <div className="timep p-4 ">Years</div>
              <div className="timespanip p-3">Milestone</div>
              <div className="project-container">
                {showHide && (
                  <Chart
                    timelineData={timelineData}
                    toggleEpic={toggleShow}
                    showHide={showHide}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="right-boxer">
              <div className="content-menu-week">
                <div className="timespanp d-flex justify-content-between">
                  <div className="months-data single py-4">
                    {monthNames[month]}
                    <div className="datemark">
                      <span>M1</span>
                      <span>T2</span>
                      <span>W3</span>
                      <span>T4</span>
                      <span>F5</span>
                      <span>S6</span>
                      <span>S7</span>
                    </div>
                  </div>
                </div>
                <div className="timespan-content d-flex justify-content-between">
                  <div className="spaner single py-3">
                    <div className="spaner-text active">
                      {"EOAD Sprint 4 (Dec-2024)"}
                    </div>
                  </div>
                </div>
                <div className="chartbox-parent">
                  {showHide && (
                    <RenderBar
                      timelineData={timelineData}
                      showHide={showHide}
                      length={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Timeline;
