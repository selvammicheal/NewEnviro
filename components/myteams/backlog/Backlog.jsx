import React, { useEffect, useState, useRef } from "react";
import { MdOutlineDragIndicator } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "react-bootstrap/Button";
import BacklogTableWithSubtask from "@/components/myteams/backlog/BacklogTableWithSubtask";
import { FaPlus } from "react-icons/fa6";
import { createEpic, fetchBacklogTableData, fetchEpic, fetchEpicByIds } from "@/services/MyTeam";
import AddEpicTable from "./AddEpicTable";
import BacklogDataTable from "./BacklogDataTable";

import { useDispatch, useSelector } from "react-redux";
import { getlocalFilter } from "@/redux/action/myteam/localFilterAction";


const Tabledata = [
  {
    id: "1",
    Epic1: "Task 1",
    Assignee: "Arun",
    Status: "In Progress",
    DueDate: "Dec 5th",
    Priority: "High",
    Timeline: "Dec25-Jan1",
    LastUpdate: "2 Weeks ago",
    dependency: "Task 1",
    subtask: [
      {
        id: "1",
        Epic1: "Subtask 1",
        Assignee: "Arun",
        Status: "In Progress",
        DueDate: "Dec 5th",
        Priority: "High",
        Timeline: "Dec25-Jan1",
        LastUpdate: "2 Weeks ago",
        dependency: "Subtask 1",
      },
      {
        id: "1",
        Epic1: "Subtask 1",
        Assignee: "Arun",
        Status: "In Progress",
        DueDate: "Dec 5th",
        Priority: "High",
        Timeline: "Dec25-Jan1",
        LastUpdate: "2 Weeks ago",
        dependency: "Subtask 1",
      },
      {
        id: "1",
        Epic1: "Subtask 1",
        Assignee: "Arun",
        Status: "In Progress",
        DueDate: "Dec 5th",
        Priority: "High",
        Timeline: "Dec25-Jan1",
        LastUpdate: "2 Weeks ago",
        dependency: "Subtask 1",
      },
      {
        id: "1",
        Epic1: "Subtask 1",
        Assignee: "Arun",
        Status: "In Progress",
        DueDate: "Dec 5th",
        Priority: "High",
        Timeline: "Dec25-Jan1",
        LastUpdate: "2 Weeks ago",
        dependency: "Subtask 1",
      },
    ],
  },
  {
    id: "2",
    Epic1: " Task 2 ",
    Assignee: "Mike",
    Status: "Done",
    DueDate: "Dec 5th",
    Priority: "High",
    Timeline: "Dec25-Jan1",
    LastUpdate: "2 Weeks ago",
    dependency: "",
  },
  {
    id: "3",
    Epic1: " Task 3 ",
    Assignee: "Bhashit",
    Status: "To Do",
    DueDate: "Dec 5th",
    Priority: "High",
    Timeline: "Dec25-Jan1",
    LastUpdate: "2 Weeks ago",
    dependency: "",
    subtask: [
      {
        id: "1",
        Epic1: "Subtask 1",
        Assignee: "Arun",
        Status: "In Progress",
        DueDate: "Dec 5th",
        Priority: "High",
        Timeline: "Dec25-Jan1",
        LastUpdate: "2 Weeks ago",
        dependency: "Subtask 1",
      },
      {
        id: "1",
        Epic1: "Subtask 1",
        Assignee: "Arun",
        Status: "In Progress",
        DueDate: "Dec 5th",
        Priority: "High",
        Timeline: "Dec25-Jan1",
        LastUpdate: "2 Weeks ago",
        dependency: "Subtask 1",
      },
      {
        id: "1",
        Epic1: "Subtask 1",
        Assignee: "Arun",
        Status: "In Progress",
        DueDate: "Dec 5th",
        Priority: "High",
        Timeline: "Dec25-Jan1",
        LastUpdate: "2 Weeks ago",
        dependency: "Subtask 1",
      },
      {
        id: "1",
        Epic1: "Subtask 1",
        Assignee: "Arun",
        Status: "In Progress",
        DueDate: "Dec 5th",
        Priority: "High",
        Timeline: "Dec25-Jan1",
        LastUpdate: "2 Weeks ago",
        dependency: "Subtask 1",
      },
    ],
  },
  {
    id: "4",
    Epic1: " Task 4 ",
    Assignee: "John",
    Status: "Done",
    DueDate: "Dec 5th",
    Priority: "High",
    Timeline: "Dec25-Jan1",
    LastUpdate: "2 Weeks ago",
    dependency: "",
  },
  {
    id: "5",
    Epic1: " Task 5 ",
    Assignee: "Mike",
    Status: "Done",
    DueDate: "Dec 5th",
    Priority: "High",
    Timeline: "Dec25-Jan1",
    LastUpdate: "2 Weeks ago",
    dependency: "",
  },
];



function Backlog(props) {
  const [EpicData, setEpicData] = useState([])
  const [activePage, setActivePage] = useState(1);
  const [isAddEpicOpen, setIsAddEpicOpen] = useState(false)
  const dispatch = useDispatch();
  const localFilter = useSelector((state) => state.localFilter);

  const EpicAddedHandler = (data) => {
    setIsAddEpicOpen(data)
    fetchEpicData()
  }

  const fetchEpicBasedOnLocalFilter = async () => {
    const data = await fetchEpicByIds(localFilter.epics);
    if (data) {
      setEpicData(data.epic)
    }
  };

  useEffect(() => {
    fetchEpicBasedOnLocalFilter()
  }, [localFilter])

  const fetchEpicData = async () => {
    const data = await fetchEpic(activePage);
    if (data) {
      setEpicData(data.epic)
    }
  };

  useEffect(() => {
    if (localFilter.epics) {
      fetchEpicBasedOnLocalFilter()
    } if (localFilter.epics === "") {
      fetchEpicData()
    }

  }, [])


  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (EpicData) {
      const newItems = Array.from(EpicData);
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);
      setEpicData(newItems);
    }
  };



  const addEmpty = () => {
    setIsAddEpicOpen(true)
  };




  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {EpicData && EpicData.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <div className="d-flex">
                        <div
                          {...provided.dragHandleProps}
                          className="drag-indicator-container"
                        >
                          <MdOutlineDragIndicator className="drag-indicator" />
                        </div>
                        <div className="table-container-parent">
                          <BacklogTableWithSubtask
                            headerName={item.title}
                            EpicId={EpicData && item._id}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {
                isAddEpicOpen && <AddEpicTable EpicAddedHandler={EpicAddedHandler} />
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        variant="outline-dark"
        size="sm"
        className="add-epic-container"
        onClick={addEmpty}
      >
        <div className="d-flex align-items-center gap-1">
          <FaPlus /> <div className="pdt02">Add Epic</div>
        </div>
      </Button>
      <BacklogDataTable />
    </>
  );
}

export default Backlog;
