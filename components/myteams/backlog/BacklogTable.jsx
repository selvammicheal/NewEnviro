import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { IoMdMore } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import Checkbox from "@mui/material/Checkbox";
import { MdLibraryBooks } from "react-icons/md";

import Dropdown from "react-bootstrap/Dropdown";
import { MdOutlineDragIndicator } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "white" : "white",
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "white" : "white",
});

function BacklogTable({ tableData, headerName, handleShowBacklogModalForAll }) {
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

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const handelView = () => {
    handleShowBacklogModalForAll(true);
  };

  return (
    <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
      {showTable ? (
        <div className="table-responsive radius-custom">
          <Table bordered size="sm">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", padding: "0.6rem" }}>
                  <IoIosArrowDown onClick={() => toggleTable()} />
                  {headerName}
                </th>
                {headers.slice(1).map((header) => (
                  <th
                    key={header}
                    style={{ whiteSpace: "nowrap", padding: "0.6rem" }}
                  >
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
                            <td
                              {...provided.dragHandleProps}
                              style={{ padding: 0 }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <MdOutlineDragIndicator
                                  style={{ marginTop: "0.5rem", color: "grey" }}
                                />
                                <div className="vertical-line"></div>
                                <Checkbox />
                                <div className="vertical-line"></div>
                                <MdLibraryBooks
                                  style={{
                                    marginTop: "0.5rem",
                                    marginLeft: "1rem",
                                    marginRight: "1rem",
                                  }}
                                />
                                <p
                                  style={{
                                    width: "100%",
                                    paddingTop: "0.4rem",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {item.Epic1}
                                </p>
                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant="success"
                                    id="dropdown-basic"
                                    style={{
                                      background: "none",
                                      border: "none",
                                    }}
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
      ) : (
        <div
          style={{
            border: "0.5px solid lightgrey",
            padding: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <div className="d-flex">
            <IoIosArrowDown
              style={{ marginRight: "1rem", color: "grey" }}
              onClick={() => toggleTable()}
            />
            <p style={{ marginRight: "1rem" }}>{headerName}</p>
            <p style={{ marginRight: "1rem" }}>{`(10 Task)`}</p>
          </div>
          <div className="d-flex">
            <div className="d-flex">
              <p
                style={{
                  borderRadius: "50%",
                  backgroundColor: "lightpink",
                  width: "1.5rem",
                  height: "1.5rem",
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                  marginRight: "0.5rem",
                }}
              >
                2
              </p>
              <p
                style={{
                  borderRadius: "50%",
                  backgroundColor: "lightpink",
                  width: "1.5rem",
                  height: "1.5rem",
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                  marginRight: "0.5rem",
                }}
              >
                1
              </p>
              <p
                style={{
                  borderRadius: "50%",
                  backgroundColor: "lightpink",
                  width: "1.5rem",
                  height: "1.5rem",
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                  marginRight: "0.5rem",
                }}
              >
                4
              </p>
            </div>
            <p
              style={{
                borderRadius: "5rem",
                backgroundColor: "black",
                textAlign: "center",
                alignItems: "center",
                color: "white",
                padding: "0.1rem",
                paddingLeft: "1.3rem",
                paddingRight: "1.3rem",
              }}
            >
              Dec 25 - Jan 21
            </p>
            <IoMdMore style={{ marginTop: "0.2rem" }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BacklogTable;
