import React, { useEffect, useState } from "react";
import { IoDiamondOutline } from "react-icons/io5";
import { FaRegMap } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import { IoMdAdd } from "react-icons/io";;
import { CiShare2 } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Row, Col, Form, Modal } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CreateNewInsideButton from "../../createnewinside/CreateNewInsideButton";
import SubtaskContainer from "../../createnewinside/Subtaskcontainer/SubtaskContainer";
import { fetchEpic, fetchMilestone, fetchTaskByEpicIdAndProjectId } from "@/services/MyTeam";
import { fetchPeople } from "@/services/People";

function CreateSubtask(props) {
  const [showDetails, setShowDetails] = useState(true);
  const [activePage, setActivePage] = useState(1)

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  const [epicData, setEpicData] = useState([])
  const [mileStoneData, setMileStoneData] = useState([])
  const [assigneeData, setAssigneData] = useState([])
  const [taskData, setTaskData] = useState([])


  const fetchAssigneeData = async () => {
    const data = await fetchPeople(activePage);
    if (data) {
      setAssigneData(data.people)
    }
  };



  const fetchEpicData = async () => {
    const data = await fetchEpic(activePage);
    if (data) {
      setEpicData(data.epic)
    }
  };


  const fetchTask = async () => {
    const data = await fetchTaskByEpicIdAndProjectId(formData.epic);
    if (data) {
      setTaskData(data.jobs)
    }
  };

  const fetchMileStoneData = async () => {
    const data = await fetchMilestone(activePage);
    if (data) {
      setMileStoneData(data.milestone)
    }
  };


  useEffect(() => {
    fetchEpicData()
    fetchAssigneeData()
    fetchMileStoneData()
  }, [])



  const [items, setItems] = useState(["Subtask 1", "Subtask 2", "Subtask 3"]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    setItems(reorderedItems);
  };

  const [milestoneIsEditable, setMilestoneIsEditable] = useState(false);
  const [milestoneText, setMilestoneText] = useState("Select Milestone");

  const handleMilestoneDoubleClick = () => {
    setMilestoneIsEditable(true);
  };


  const handleMilestoneBlur = () => {
    setMilestoneIsEditable(false);
  };

  const [epicIsEditable, setEpicIsEditable] = useState(false);
  const [epicText, setEpicText] = useState("Select Epic");

  const handleEpicDoubleClick = () => {
    setEpicIsEditable(true);
  };


  const handleEpicBlur = () => {
    setEpicIsEditable(false);
  };

  const [showFilter, setShowFilter] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    assignee: '',
    epic: '',
    milestone: '',
    task: '',
    status: '',
    dueDate: '',
    timeline: '',
    priority: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  props.handleFormData(formData)

  useEffect(() => {
    fetchTask()
  }, [formData])

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-between">
          <div className="map-icon-container">
            <FaRegMap className="map-outline-icon" />
            <div>
              {milestoneIsEditable ? (
                <input
                  type="text"
                  value={milestoneText}
                  onChange={handleMilestoneChange}
                  onBlur={handleMilestoneBlur}
                  autoFocus // Automatically focuses on the input when it appears
                  className="double-click-input"
                />
              ) : (
                <p
                  onDoubleClick={handleMilestoneDoubleClick}
                  className="type-of-task-text"
                >
                  {milestoneText}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <CreateNewInsideButton />
          <Button variant="outline-dark" size="sm" className="share-button">
            <CiShare2 className="icon-react-cus" />
          </Button>
        </div>
      </div>
      <p className="last-activity-text">Last Update : NIL</p>
      <div className="create-task-box-container">
        <div className="d-flex justify-content-between">
          <p>Details</p>
          {showDetails ? (
            <IoIosArrowDown
              onClick={toggleDetails} />
          ) : (
            <IoIosArrowUp onClick={toggleDetails} />
          )}
        </div>
        {showDetails ? (
          <div className="form-container-createtask">
            <Row>
              <Col sm={3} md={3}>
                <p className="form-group-title">Title</p>
              </Col>
              <Col sm={9} md={9}>
                <Form.Group className="mb-2">
                  <Form.Control type="text" placeholder="Enter Title" value={formData.title}
                    onChange={handleChange} name="title" />
                </Form.Group>
              </Col>
              <Col sm={3} md={3}>
                <p className="form-group-title">Summary</p>
              </Col>
              <Col sm={9} md={9}>
                <Form.Group className="mb-2">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.summary}
                    onChange={handleChange}
                    name="summary"
                  />
                </Form.Group>
              </Col>
              <Col sm={3} md={3}>
                <p className="form-group-title">Assignee</p>
              </Col>
              <Col sm={9} md={9}>
                <Form.Group className="mb-2">
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={formData.assignee}
                      onChange={handleChange}
                      name="assignee"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ maxHeight: "2.5rem", color: "grey" }}
                    >
                      <MenuItem value="">
                        <em>Select Assignee</em>
                      </MenuItem>
                      {
                        assigneeData.map((epic) => (
                          <MenuItem value={epic._id} key={epic._id}>{epic.name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Form.Group>
              </Col>
              <Col sm={3} md={3}>
                <p className="form-group-title">Milestone</p>
              </Col>
              <Col sm={9} md={9}>
                <Form.Group className="mb-2">
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={formData.milestone}
                      onChange={handleChange}
                      name="milestone"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ maxHeight: "2.5rem", color: "grey" }}
                    >
                      <MenuItem value="">
                        <em>Select Milestone</em>
                      </MenuItem>
                      {
                        mileStoneData.map((milestone) => (
                          <MenuItem value={milestone._id} key={milestone._id}>{milestone.title}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Form.Group>
              </Col>
              <Col sm={3} md={3}>
                <p className="form-group-title">Epic</p>
              </Col>
              <Col sm={9} md={9}>
                <Form.Group className="mb-2">
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={formData.epic}
                      onChange={handleChange}
                      name="epic"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ maxHeight: "2.5rem", color: "grey" }}
                    >
                      <MenuItem value="">
                        <em>Select Epic</em>
                      </MenuItem>
                      {
                        epicData.map((epic) => (
                          <MenuItem value={epic._id} key={epic._id}>{epic.title}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Form.Group>
              </Col>
              <Col sm={3} md={3}>
                <p className="form-group-title">Task</p>
              </Col>
              <Col sm={9} md={9}>
                <Form.Group className="mb-2">
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={formData.task}
                      onChange={handleChange}
                      name="task"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ maxHeight: "2.5rem", color: "grey" }}
                    >
                      <MenuItem value="">
                        <em>Select Task</em>
                      </MenuItem>
                      {
                        taskData.map((task) => (
                          <MenuItem value={task._id} key={task._id}>{task.title}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Form.Group>
              </Col>
              <Col sm={3} md={3}>
                <p className="form-group-title">Status</p>
              </Col>

              <Col sm={9} md={9}>
                <Form.Group className="mb-2">
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={formData.status}
                      onChange={handleChange}
                      name="status"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ maxHeight: "2.5rem", color: "grey" }}
                    >
                      <MenuItem value="">
                        <em>Select Status</em>
                      </MenuItem>
                      <MenuItem value={"To-do"}>To-do</MenuItem>
                      <MenuItem value={"In Progress"}>In Progress</MenuItem>
                      <MenuItem value={"Ready For QA"}>Ready For QA</MenuItem>
                      <MenuItem value={"Done"}>Done</MenuItem>
                    </Select>
                  </FormControl>
                </Form.Group>
              </Col>
              <Col sm={3} md={3}>
                <p className="form-group-title">Due Date</p>
              </Col>
              <Col sm={9} md={9}>
                <Form.Group className="mb-2">
                  <Form.Control type="date" className="gray-color" value={formData.dueDate}
                    onChange={handleChange} name="dueDate" />
                </Form.Group>
              </Col>
              <Col sm={3} md={3}>
                <p className="form-group-title">Priority</p>
              </Col>
              <Col sm={9} md={9}>
                <Form.Group className="mb-2">
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      value={formData.priority}
                      onChange={handleChange}
                      name="priority"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ maxHeight: "2.5rem", color: "grey" }}
                    >
                      <MenuItem value="">
                        <em>Select Priority</em>
                      </MenuItem>
                      <MenuItem value={"Low"}>Low</MenuItem>
                      <MenuItem value={"Medium"}>Medium</MenuItem>
                      <MenuItem value={"High"}>High</MenuItem>
                    </Select>
                  </FormControl>
                </Form.Group>
              </Col>
              <Col sm={3} md={3}>
                <p className="form-group-title">Timeline</p>
              </Col>
              <Col sm={9} md={9}>
                <Form.Group className="mb-2">
                  <Form.Control type="date" className="gray-color" value={formData.timeline}
                    onChange={handleChange} name="timeline" />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
      <Modal
        show={showFilter}
        onHide={() => {
          setShowFilter(false);
        }}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Subtask</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-createnew">
          <SubtaskContainer />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              setShowFilter(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              setShowFilter(false);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

}

export default CreateSubtask;
