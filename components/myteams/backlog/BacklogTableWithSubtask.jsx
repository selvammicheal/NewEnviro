import React, { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
import { IoMdMore } from "react-icons/io";
import Checkbox from "@mui/material/Checkbox";
import Assignee from "./Assignee";
import TableDoneItem from "./Done";
import PriorityItem from "./PriorityItem";
import Dropdown from "react-bootstrap/Dropdown";
import { MdOutlineDragIndicator } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DatePicker from "./DatePicker";
import SubtaskRow from "./SubtaskRow";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { fetchAdvancedFilteredJob, fetchChildJob, fetchFilteredJob, fetchJobById } from "@/services/MyTeam";
import { formatDate } from "@/utils/Project";
import AddNewJob from "./AddNewJob";
import { useDispatch, useSelector } from "react-redux";
import { getAdvanceFilter } from "@/redux/action/myteam/advanceFilterAction";

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "white" : "white",
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "white" : "white",
});

function BacklogTableWithSubtask({ headerName, EpicId,}) {
  const EmptyTableData = [
    {
      id: "row-1",
      Epic1: "Default 1",
      Assignee: null,
      Status: null,
      DueDate: "Dec 10th",
      Priority: null,
      Timeline: "26Dec-14Jan",
      LastUpdate: "4 Weeks Ago",
      Dependency: "Task 2",
      subtask: [
        {
          Epic1: "Default 1",
          Assignee: null,
          Status: null,
          DueDate: "Dec 10th",
          Priority: null,
          Timeline: "26Dec-14Jan",
          LastUpdate: "4 Weeks Ago",
          Dependency: "Task 2",
        },
      ],
    },
    {
      id: "row-2",
      Epic1: "Default",
      Assignee: null,
      Status: null,
      DueDate: "Dec 10th",
      Priority: null,
      Timeline: "26Dec-14Jan",
      LastUpdate: "4 Weeks Ago",
      Dependency: "Task 2",
      subtask: [
        {
          Epic1: "Default 1",
          Assignee: null,
          Status: null,
          DueDate: "Dec 10th",
          Priority: null,
          Timeline: "26Dec-14Jan",
          LastUpdate: "4 Weeks Ago",
          Dependency: "Task 2",
        },
        {
          Epic1: "Default 2",
          Assignee: null,
          Status: null,
          DueDate: "Dec 10th",
          Priority: null,
          Timeline: "26Dec-14Jan",
          LastUpdate: "4 Weeks Ago",
          Dependency: "Task 2",
        },
        {
          Epic1: "Default 3",
          Assignee: null,
          Status: null,
          DueDate: "Dec 10th",
          Priority: null,
          Timeline: "26Dec-14Jan",
          LastUpdate: "4 Weeks Ago",
          Dependency: "Task 2",
        },
        {
          Epic1: "Default 4",
          Assignee: null,
          Status: null,
          DueDate: "Dec 10th",
          Priority: null,
          Timeline: "26Dec-14Jan",
          LastUpdate: "4 Weeks Ago",
          Dependency: "Task 2",
        },
      ],
    },
  ];
  const [showTable, setShowTable] = useState(true);
  const [name, setName] = useState(headerName);
  const [dynamicHeader, setHeader] = useState([
    "Assignee",
    "Status",
    "Due Date",
    "Priority",
    "Timeline",
    "Last Update",
    "Dependency",
  ]);
  const [columnSearch, setColumnSearch] = useState("");
  const [JobData, setJobData] = useState([])
  const [JobDataSet, setJobDataSet] = useState([])
  const [isLoding, setIsLoding] = useState(true)
  const [activePage, setActivePage] = useState(1);
  const [isJobAdded, setIsJobAdded] = useState(false)

  const dispatch = useDispatch();
  const advanceFilter = useSelector((state) => state.advanceFilter);
  const localFilter = useSelector((state) => state.localFilter);


  const fetchAdvanceFilter = async () => {
    dispatch(getAdvanceFilter({ advanceFilterClick: false }));
    let filterParams = {
      limit: 10,
      page: 1,
      filterTypeComp: advanceFilter.jobtype,
      ownerIds: advanceFilter.ownerIds,
      filterStatus: advanceFilter.status,
      filterendDate: advanceFilter.beforedate,
      filterstartDate: advanceFilter.afterdate,
      EpicId
    };
    fetchAdvancedFilteredJob(filterParams)
      .then((data) => {
        console.log("data...", data)
        setJobDataSet(data)
        setJobData(data.jobs)
      })
      .catch((error) => {
      });
  };
  const fetchFilterJobData = async () => {
    const filterParams = {
      limit: 10,
      page: 1,
      jobType: localFilter.types,
      assigneeIds: localFilter.ownerIds,
      sortOrder: localFilter.sort,
      epicId: EpicId
    };
    fetchFilteredJob(filterParams)
      .then((data) => {
        setJobDataSet(data)
        setJobData(data.jobs)
      })
      .catch((error) => {

      });
  };

  const jobAddedHandler = (data) => {
    if (isJobAdded === true) {
      setIsJobAdded(false)
    } else if (isJobAdded === false) {
      setIsJobAdded(true)
    }
  }

  const fetchData = async () => {
    const data = await fetchJobById(activePage, EpicId);
    if (data) {
      setJobDataSet(data)
      setJobData(data.jobs)
      setIsLoding(false)
    }
  };

  useEffect(() => {
    const hasLocalFilter = localFilter.epics.length > 0 || localFilter.ownerIds.length > 0 || localFilter.types.length > 0 || localFilter.sort !== "";
    const hasAdvanceFilter = advanceFilter.ownerIds.length > 0 || advanceFilter.afterdate !== "" || advanceFilter.beforedate !== "" || advanceFilter.jobtype !== "" || advanceFilter.status !== "";
    if (hasAdvanceFilter) {
      fetchAdvanceFilter();
    } else if (hasLocalFilter) {
      fetchFilterJobData();
    } else {
      fetchData();
    }
  }, [localFilter, isJobAdded, advanceFilter.advanceFilterClick]);

  useEffect(() => {
    setJobData(JobData)
  }, [JobData])


  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = Array.from(JobData);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setJobData(newItems);
  };
  if (!EmptyTableData || EmptyTableData.length === 0) {
    return <div>No data available</div>;
  }
  const headers = [
    "Epic 1",
    "Assignee",
    "Status",
    "Due Date",
    "Priority",
    "Timeline",
    "Last Update",
    "Dependency",
  ];
  const toggleTable = () => {
    setShowTable(!showTable);
  };
  const handelView = () => {
    handleShowBacklogModalForAll(true);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleOut = (item) => {
    if (item.length < 1) {
      return;
    }
    setName(item);
  };
  const handleSubmitEpic = (event) => {
    event.preventDefault();
    const item = event.target.elements.epicname.value;
    handleOut(item);
  };

  const toggleColumn = (item) => {
    let arr = [...dynamicHeader];
    if (arr.includes(item)) {
      arr = arr.filter((el) => el != item);
    } else {
      arr.push(item);
      // console.log("Not Available");
    }
    setHeader(arr);
  };


  const [IsSubtask, setIsSubtask] = useState()

  const handleShowSubtask = (data) => {
    setIsSubtask(data)
    fetchJobChild(data)
  }
  const [subtaskData, setSubtaskData] = useState([])

  const fetchJobChild = async (id) => {
    setSubtaskData([])
    const data = await fetchChildJob(activePage, id);
    if (data) {
      setSubtaskData(data.jobs)
    }
  };



  return (
    <div className="mrb mrt">
      {showTable ? (
        <div className="table-responsive radius-custom scrollbar-custom">
          <Table bordered size="sm mrb00">
            <thead>
              <tr>
                <th className="heading-backlog-table">
                  <SlArrowDown
                    onClick={() => toggleTable()}
                    className="margin-1"
                  />
                  {name}
                </th>
                {headers
                  .filter((item) => dynamicHeader.includes(item))
                  .map((header) => (
                    <th
                      key={header}
                      className="heading-backlog-table text-center"
                    >
                      {header}
                    </th>
                  ))}
                <th className="heading-backlog-table text-center add-column">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic-3"
                      className="p-0 bg-transparent border-0 text-black white-nowrap text-center fw-bolder add-column"
                    >
                      <span>+ Add Columns</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <div className="position-relative">
                        <div className="search-icon-container-column">
                          <CiSearch className="people-search-icon" />
                        </div>
                        <input
                          type="text"
                          value={columnSearch}
                          className="search-column"
                          onChange={(e) => setColumnSearch(e.target.value)}
                        />
                      </div>
                      {headers
                        .slice(1)
                        .filter((item) =>
                          item
                            .toLowerCase()
                            .includes(columnSearch.toLowerCase())
                        )
                        .map((item, index) => (
                          <div className="d-flex align-items-center pdl">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={dynamicHeader.includes(item)}
                              onChange={() => {
                                toggleColumn(item);
                              }}
                            />
                            <Dropdown.Item className="p-0 w-auto mrlh my-1 pdt04">
                              {item}
                            </Dropdown.Item>
                          </div>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </th>
              </tr>
            </thead>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <tbody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {JobData.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <>
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <td
                                {...provided.dragHandleProps}
                                className="p-0"
                              >
                                <div className="d-flex table-item-epic">
                                  <MdOutlineDragIndicator className="gray-color mrt-06 icon-react-cus" />
                                  <div className="vertical-line"></div>
                                  <Checkbox />
                                  <div className="vertical-line"></div>
                                  <MdOutlineLibraryBooks className="mrt-06 mrlh mrrh icon-react-cus" />
                                  {
                                    item.subtaskCount > 0 &&
                                    <div>
                                      {
                                        IsSubtask == item._id ?
                                          <SlArrowDown className="arrow-icon-backlog" onClick={() => handleShowSubtask('')} /> :
                                          <SlArrowRight className="arrow-icon-backlog" onClick={() => handleShowSubtask(item._id)} />
                                      }
                                    </div>
                                  }
                                  <p
                                    className="white-nowrap mrt07 fontsize-08"
                                    onDoubleClick={() => {
                                      setCurrentEditing(item._id);
                                    }}
                                  >
                                    {item.title}
                                  </p>
                                  <Dropdown className="align-rt">
                                    <Dropdown.Toggle
                                      variant="success"
                                      id="dropdown-basic"
                                      className="dropdown-toggle-button mr-lft-auto"
                                    >
                                      <IoMdMore />
                                    </Dropdown.Toggle>
                                  </Dropdown>
                                </div>
                              </td>
                              {dynamicHeader.includes("Assignee") && (
                                <td className="text-center">
                                  <Assignee ownername={item.assignee_name} jid={item._id} />
                                </td>
                              )}
                              {dynamicHeader.includes("Status") && (
                                <td>
                                  <TableDoneItem status={item.status} jid={item._id} />
                                </td>
                              )}
                              {dynamicHeader.includes("Due Date") && (
                                <td>
                                  <div className="d-flex align-items-center justify-content-center mrt04 font08">
                                    <DatePicker dueDate={formatDate(item.due_date)} jid={item._id} />
                                  </div>
                                </td>
                              )}
                              {dynamicHeader.includes("Priority") && (
                                <td>
                                  <PriorityItem priority={item.priority} jid={item._id} />
                                </td>
                              )}
                              {dynamicHeader.includes("Timeline") && (
                                <td>
                                  <p className="timeline-data-cell-backlog">
                                    {item.timeline === null ? "NIL" : formatDate(item.timeline)}
                                  </p>

                                </td>
                              )}
                              {dynamicHeader.includes("Last Update") && (
                                <td>
                                  <div className="d-flex align-items-center justify-content-center mrt04 font08">
                                    {formatDate(item.updated_at)}
                                  </div>
                                </td>
                              )}
                              {dynamicHeader.includes("Dependency") && (
                                <td className=" font08" style={{ textAlign: "center" }}>null</td>
                              )}
                            </tr>
                            {
                              IsSubtask == item._id &&
                              <>
                                {
                                  subtaskData &&
                                  <>
                                    {
                                      subtaskData.map((e) => (
                                        <SubtaskRow item={e} />
                                      ))
                                    }
                                  </>
                                }
                              </>

                            }
                          </>

                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
              
            </DragDropContext>
          </Table>
          <AddNewJob EpicId={EpicId} jobAddedHandler={jobAddedHandler} />
        </div>
      ) : (
        <div className="b-05-lg pdah d-flex justify-content-between align-items-center bdr05 mrt">
          <div className="d-flex">
            <SlArrowRight
              className="margin-1 gray-color"
              onClick={() => toggleTable()}
            />
            <p className="mrr top-margin-backlog">{name}</p>
            <p className="mrr top-margin-backlog">{`(10 Task)`}</p>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="epic-collapsed-avatars ">
                <p className="top-margin-avatar">2</p>
              </div>
              <div className="epic-collapsed-avatars ">
                <p className="top-margin-avatar">1</p>
              </div>
              <div className="epic-collapsed-avatars ">
                <p className="top-margin-avatar">4</p>
              </div>
            </div>
            <div className="epic-collapsed-timeline ">
              <p className="top-margin-backlog">Dec 25 - Jan 21</p>
            </div>
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic-2"
                className="dropdown-toggle-backlog"
              >
                <PiDotsThreeVerticalBold className="ciicon-timeline" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handelView}>View</Dropdown.Item>
                <Dropdown.Item onClick={handelView}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={handelView}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default BacklogTableWithSubtask;
