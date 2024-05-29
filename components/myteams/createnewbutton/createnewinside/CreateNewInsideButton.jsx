import React, { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SubtaskContainer from "./Subtaskcontainer/SubtaskContainer";
import FeedbackContainer from "./FeedbackContainer/FeedbackContainer";
import CorrectionContainer from "./CorrectionContainer/CorrectionContainer";
import { FaPlus } from "react-icons/fa6";
import { createJobByForm } from "@/services/MyTeam";

function CreateNewInsideButton(props) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  let jobData = null

  const handleSubmitJob = (jobprops) => {
    jobData = jobprops
  }

  const handleSubmitForm = () => {
     handleAddJob()
  }


  const handleSelect = (eventKey, event) => {
    setSelectedItem(event.target.textContent);
    setShowFilter(true);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };
  const handleShowFilter = () => setShowFilter(true);

  const handleAddJob = async () => {
    try {
      const response = await createJobByForm(jobData);
      if (response.status === true) {
        console.log("Job has been created")
      }
      else if (response.status === false) {
        console.log("Job has not been created")
      }

    } catch (error) {
      console.error('Error creating Job:', error);
    }
  };

  return (
    <div>
      <DropdownButton
        id="dropdown-basic-button"
        title={
          <>
            <FaPlus /> Create
          </>
        }
        variant="outline-dark"
        size="sx"
        onSelect={handleSelect}
      >
        <Dropdown.Item eventKey="SubTask">SubTask</Dropdown.Item>
        <Dropdown.Item eventKey="Feedback">Feedback</Dropdown.Item>
        <Dropdown.Item eventKey="Correction">Correction</Dropdown.Item>
      </DropdownButton>
      <Modal show={showFilter} onHide={handleCloseFilter} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem === "SubTask"
              ? "SubTask"
              : selectedItem === "Feedback"
              ? "Feedback"
              : "Correction"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="createnew-modal-nested">
          {selectedItem === "SubTask" ? (
            <SubtaskContainer selectedItem={selectedItem}  handleSubmitJob={handleSubmitJob}/>
          ) : selectedItem === "Feedback" ? (
            <FeedbackContainer selectedItem={selectedItem}  handleSubmitJob={handleSubmitJob}/>
          ) : (
            <CorrectionContainer selectedItem={selectedItem}  handleSubmitJob={handleSubmitJob}/>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleCloseFilter}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSubmitForm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateNewInsideButton;
