"use client";

import React, { useEffect, useState } from "react";
import { fetchKanbanBoardAdvanceFilter, fetchKanbanBoardByStatus, fetchKanbanBoardLocalFilter, updateJobByJobId } from "@/services/MyTeam";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaCheck } from "react-icons/fa6";
import KanbanCard from "@/components/myteams/kanban/KanbanCard";

import { useDispatch, useSelector } from "react-redux";
import { getlocalFilter } from "@/redux/action/myteam/localFilterAction";

function KanbanComp(props) {
  const [activePage, setActivePage] = useState(1);
  const [columns, setColumns] = useState({
    todo: { name: "To Do", number: 0, items: [] },
    inprogress: { name: "In Progress", number: 0, items: [] },
    readyforqa: { name: "Ready For QA", number: 0, items: [] },
    done: { name: "Done", number: 0, items: [] }
  });
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const localFilter = useSelector((state) => state.localFilter);
  const advanceFilter = useSelector((state) => state.advanceFilter);


  const fetchAdvanceFilter = async () => {
    let columnsData = {
      todo: { name: "To Do", number: 0, items: [] },
      inprogress: { name: "In Progress", number: 0, items: [] },
      readyforqa: { name: "Ready For QA", number: 0, items: [] },
      done: { name: "Done", number: 0, items: [] }
    };

    if (advanceFilter.status === "") {
      const tododata = await fetchKanbanBoardAdvanceFilter(activePage, "To-do", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
      const progressdata = await fetchKanbanBoardAdvanceFilter(activePage, "In Progress", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
      const qadata = await fetchKanbanBoardAdvanceFilter(activePage, "Ready For QA", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
      const donedata = await fetchKanbanBoardAdvanceFilter(activePage, "Done", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
      if (tododata && progressdata && qadata && donedata) {
        setColumns({
          todo: { name: "To Do", number: tododata.jobs.length, items: tododata.jobs },
          inprogress: { name: "In Progress", number: progressdata.jobs.length, items: progressdata.jobs },
          readyforqa: { name: "Ready For QA", number: qadata.jobs.length, items: qadata.jobs },
          done: { name: "Done", number: donedata.jobs.length, items: donedata.jobs }
        });
        setIsLoading(false);
      }
    }
    else if(advanceFilter.status != ""){
      if (advanceFilter.status === "To-do") {
        const tododata = await fetchKanbanBoardAdvanceFilter(activePage, "To-do", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
        if (tododata) {
          columnsData.todo = { name: "To Do", number: tododata.jobs.length, items: tododata.jobs };
        }
      } else if (advanceFilter.status === "In Progress") {
        const progressdata = await fetchKanbanBoardAdvanceFilter(activePage, "In Progress", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
        if (progressdata) {
          columnsData.inprogress = { name: "In Progress", number: progressdata.jobs.length, items: progressdata.jobs };
        }
      } else if (advanceFilter.status === "Ready For QA") {
        const qadata = await fetchKanbanBoardAdvanceFilter(activePage, "Ready For QA", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
        if (qadata) {
          columnsData.readyforqa = { name: "Ready For QA", number: qadata.jobs.length, items: qadata.jobs };
        }
      } else if (advanceFilter.status === "Done") {
        const donedata = await fetchKanbanBoardAdvanceFilter(activePage, "Done", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
        if (donedata) {
          columnsData.done = { name: "Done", number: donedata.jobs.length, items: donedata.jobs };
        }
      }
      setColumns(columnsData);
      setIsLoading(false);
    }
   
  };


  // const fetchAdvanceFilter = async () => {
  //   const tododata = await fetchKanbanBoardAdvanceFilter(activePage, "To Do", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
  //   const progressdata = await fetchKanbanBoardAdvanceFilter(activePage, "In Progress", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
  //   const qadata = await fetchKanbanBoardAdvanceFilter(activePage, "Ready For QA", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
  //   const donedata = await fetchKanbanBoardAdvanceFilter(activePage, "Done", advanceFilter.jobtype, advanceFilter.ownerIds, advanceFilter.afterdate, advanceFilter.beforedate);
  //   if (tododata && progressdata && qadata && donedata) {
  //     setColumns({
  //       todo: { name: "To Do", number: tododata.jobs.length, items: tododata.jobs },
  //       inprogress: { name: "In Progress", number: progressdata.jobs.length, items: progressdata.jobs },
  //       readyforqa: { name: "Ready For QA", number: qadata.jobs.length, items: qadata.jobs },
  //       done: { name: "Done", number: donedata.jobs.length, items: donedata.jobs }
  //     });
  //     setIsLoading(false);
  //   }
  // };

  const fetchLocalFilter = async () => {
    const tododata = await fetchKanbanBoardLocalFilter(activePage, 'To-do', localFilter.epics, localFilter.types);
    const progressdata = await fetchKanbanBoardLocalFilter(activePage, 'In Progress', localFilter.epics, localFilter.types);
    const qadata = await fetchKanbanBoardLocalFilter(activePage, 'Ready For QA', localFilter.epics, localFilter.types);
    const donedata = await fetchKanbanBoardLocalFilter(activePage, 'Done', localFilter.epics, localFilter.types);
    if (tododata && progressdata && qadata && donedata) {
      setColumns({
        todo: { name: "To Do", number: tododata.jobs.length, items: tododata.jobs },
        inprogress: { name: "In Progress", number: progressdata.jobs.length, items: progressdata.jobs },
        readyforqa: { name: "Ready For QA", number: qadata.jobs.length, items: qadata.jobs },
        done: { name: "Done", number: donedata.jobs.length, items: donedata.jobs }
      });
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    const tododata = await fetchKanbanBoardByStatus(activePage, 'To-do');
    const progressdata = await fetchKanbanBoardByStatus(activePage, 'In Progress');
    const qadata = await fetchKanbanBoardByStatus(activePage, 'Ready For QA');
    const donedata = await fetchKanbanBoardByStatus(activePage, 'Done');
    if (tododata && progressdata && qadata && donedata) {
      setColumns({
        todo: { name: "To Do", number: tododata.jobs.length, items: tododata.jobs },
        inprogress: { name: "In Progress", number: progressdata.jobs.length, items: progressdata.jobs },
        readyforqa: { name: "Ready For QA", number: qadata.jobs.length, items: qadata.jobs },
        done: { name: "Done", number: donedata.jobs.length, items: donedata.jobs }
      });
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const hasLocalFilter = localFilter.epics.length > 0 || localFilter.ownerIds.length > 0 || localFilter.types.length > 0 || localFilter.sort !== "";
    const hasAdvanceFilter = advanceFilter.ownerIds.length > 0 || advanceFilter.afterdate !== "" || advanceFilter.beforedate !== "" || advanceFilter.jobtype !== "" || advanceFilter.status !== "";
    if (hasAdvanceFilter) {
      fetchAdvanceFilter()
    } else if (hasLocalFilter) {
      fetchLocalFilter();
    } else {
      fetchData();
    }
  }, [localFilter, advanceFilter.advanceFilterClick]);


  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
    handleUpdateJob(draggableId, destination.droppableId)
  };

  const handleUpdateJob = async (JobId, status) => {
    let Value = null
    if (status === "readyforqa") {
      Value = "Ready For QA"
    } else if (status === "done") {
      Value = "Done"
    }
    else if (status === "todo") {
      Value = "To-do"
    } else if (status === "inprogress") {
      Value = "In Progress"
    }
    const data = {
      "status": Value,
    }
    try {
      const response = await updateJobByJobId(JobId, data);
      if (response.status === true) {
        console.log("job has been updated")
        // fetchData()
      }
      else if (response.status === false) {
        console.log("job has not been updated")
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="d-flex wid-full">
      {isLoading ? "Loading" :
        <div className="d-flex wid-full">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  className="d-flex flex-column align-items-center"
                  key={columnId}
                >
                  <div className="droppable-container-kanban">
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="droppable-div-kanban"
                          >
                            <div className="d-flex">
                              <p className="font09 fw-bolder pdt02">
                                {column.name}
                              </p>
                              <button
                                className="kanban-top-button"
                                style={{
                                  marginLeft: "1rem",
                                  backgroundColor:
                                    column.name === "Done" ? "#4BC766" : "black",
                                }}
                              >
                                {" "}
                                {column.name === "Done" ? (
                                  <FaCheck />
                                ) : (
                                  column.number
                                )}
                              </button>
                            </div>
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item._id}
                                  draggableId={item._id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <KanbanCard
                                          item={item}
                                          handleShowModalForAll={
                                            props.handleShowModalForAll
                                          }
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      }
    </div>
  );
}

export default KanbanComp;
