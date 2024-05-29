import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { IoMdMore } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import Checkbox from "@mui/material/Checkbox";
import { MdLibraryBooks } from "react-icons/md";
import Assignee from "./Assignee";
import TableDoneItem from "./Done";

import PriorityItem from "./PriorityItem";

import Dropdown from "react-bootstrap/Dropdown";
import { MdOutlineDragIndicator } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DatePicker from "./DatePicker";
import EmptyRow from "./EmptyRow";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Form } from "react-bootstrap";
import SubtaskRow from "./SubtaskRow";

import { SlArrowDown } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { MdOutlineLibraryBooks } from "react-icons/md";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { CiSearch } from "react-icons/ci";
import { BsChevronRight } from "react-icons/bs";
import { fetchAdvancedFilteredJobForBacklog, fetchBacklogTableData, fetchFilteredJob, fetchFilteredJobBacklogTable, fetchJobById } from "@/services/MyTeam";
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

function BacklogDataTable() {
    const [activePage, setActivePage] = useState(1);
    const [showTable, setShowTable] = useState(true);
    const [name, setName] = useState("Backlog");
    const [columnSearch, setColumnSearch] = useState("");
    const [JobData, setJobData] = useState([])
    const [jobAdded, setJobAdded] = useState(false)

    const dispatch = useDispatch();
    const advanceFilter = useSelector((state) => state.advanceFilter);
    const localFilter = useSelector((state) => state.localFilter);

    useEffect(() => {
        fetchAdvanceFilter()
      }, [advanceFilter.advanceFilterClick])

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
        };
        fetchAdvancedFilteredJobForBacklog(filterParams)
          .then((data) => {
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
        };
        fetchFilteredJobBacklogTable(filterParams)
            .then((data) => {
                setJobData(data.jobs)
            })
            .catch((error) => {
                console.error("Error fetching filtered projects:", error);
            });
    };

    useEffect(() => {
        fetchFilterJobData()
    }, [localFilter.types, localFilter.ownerIds, localFilter.sort])

    const jobAddedHandler = () => {
        if (jobAdded === true) {
            setJobAdded(false)
        } else if (jobAdded === false) {
            setJobAdded(true)
        }
    }

    useEffect(() => {
        fetchBacklogData()
    }, [jobAdded])

    const [dynamicHeader, setHeader] = useState([
        "Assignee",
        "Status",
        "Due Date",
        "Priority",
        "Timeline",
        "Last Update",
        "Dependency",
    ]);


    const fetchBacklogData = async () => {
        const data = await fetchBacklogTableData(activePage);
        if (data) {
            setJobData(data.jobs)
        }
    };

    // useEffect(() => {
    //     fetchBacklogData()
    // }, [])


    //Function related to the drag and drop
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const newItems = Array.from(JobData);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);
        setJobData(newItems);
    };


    //Headers of the table
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

    //For toggling the table
    const toggleTable = () => {
        setShowTable(!showTable);
    };

    //For handeling the view
    const handelView = () => {
        // console.log("backlogitem got clicked");
        handleShowBacklogModalForAll(true);
    };

    // Mui menu component data
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
    };

    // Data related to adding new row
    const handleOut = (item) => {
        if (item.length < 1) {
            return;
        }
        setName(item);
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
                                                                    <p
                                                                        className="white-nowrap mrt07 fontsize-08"
                                                                        onDoubleClick={() => {
                                                                            setCurrentEditing(item._id);
                                                                        }}
                                                                    >
                                                                        {item.title}
                                                                    </p>

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
                                                                    <div className="d-flex align-items-center justify-content-center pda03 font08">
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
                                                                        {item.timeline === null ? "NIL" : item.timeline}
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
                    <AddNewJob jobAddedHandler={jobAddedHandler} />
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

export default BacklogDataTable;
