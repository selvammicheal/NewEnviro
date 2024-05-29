import React, { useState } from "react";
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

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "white" : "white",
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "white" : "white",
});

function EpicTable({ tableData, headerName, handleShowBacklogModalForAll }) {
  const [items, setItems] = useState(tableData);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  if (!tableData || tableData.length === 0) {
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

  const [showTable, setShowTable] = useState(true);

  const [selectedDate, setSelectedDate] = useState("10 Dec");

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const handelView = () => {
    handleShowBacklogModalForAll(true);
  };

  return (
    <div className="mrb mrt">
      {showTable ? (
        <div className="table-responsive">
          <div className="bdr05">
            <Table bordered size="sm">
              <thead>
                <tr>
                  <th className="heading-backlog-table">
                    <IoIosArrowDown
                      onClick={() => toggleTable()} />
                    {headerName}
                  </th>
                  {headers.slice(1).map((header) => (
                    <th key={header} className="heading-backlog-table">
                      {header}
                    </th>
                  ))}
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
                      {items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <td {...provided.dragHandleProps} className="p-0">
                                <div className="d-flex justify-content-between">
                                  <MdOutlineDragIndicator className="mrth gray-color" />
                                  <div className="vertical-line"></div>
                                  <Checkbox />
                                  <div className="vertical-line"></div>
                                  <MdLibraryBooks className="mrth mrl mrr" />
                                  <p className="wid-full pdt04 white-nowrap">
                                    {item.Epic1}
                                  </p>
                                  <Dropdown>
                                    <Dropdown.Toggle
                                      variant="success"
                                      id="dropdown-basic"
                                      className="dropdown-toggle-backlog"
                                    >
                                      <IoMdMore color="disabled" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item onClick={handelView}>
                                        View
                                      </Dropdown.Item>
                                      <Dropdown.Item onClick={handelView}>
                                        Edit
                                      </Dropdown.Item>
                                      <Dropdown.Item href="#/action-3">
                                        Delete
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </td>
                              <td className="pdah text-center align-items-center">
                                <Assignee />
                              </td>
                              <td className="pdah">
                                <TableDoneItem />
                              </td>
                              <td>
                                <div className="d-flex align-items-center justify-content-center pda03 font08">
                                  <>
                                    <p className="white-nowrap">{selectedDate}</p>
                                    <DatePicker
                                      handleSelectedDate={handleSelectedDate}
                                    />
                                  </>
                                </div>
                              </td>
                              <td className="pdah text-center align-items-center">
                                <PriorityItem />
                              </td>
                              <td>
                                {item.Timeline ? (
                                  <p className="timeline-data-cell-backlog">
                                    {item.Timeline}
                                  </p>
                                ) : null}
                              </td>
                              <td>
                                <div className="d-flex align-items-center justify-content-center mrt04 font08">
                                  {item.LastUpdate}
                                </div>
                              </td>
                              <td className="pdah text-center align-items-center white-nowrap">
                                {null}
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </DragDropContext>
            </Table>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-between b-05-lg pdah bdr05 mrt">
          <div className="d-flex">
            <IoIosArrowDown
              className="mrr gray-color"
              onClick={() => toggleTable()}
            />
            <p className="mrr">{headerName}</p>
            <p className="mrr">{`(10 Task)`}</p>
          </div>
          <div className="d-flex">
            <div className="d-flex">
              <p className="epic-collapsed-avatars">2</p>
              <p className="epic-collapsed-avatars">1</p>
              <p className="epic-collapsed-avatars">4</p>
            </div>
            <p className="epic-collapsed-timeline ">Dec 25 - Jan 21</p>
            <IoMdMore className="mrt02" />
          </div>
        </div>
      )}
    </div>
  );
}

export default EpicTable;
