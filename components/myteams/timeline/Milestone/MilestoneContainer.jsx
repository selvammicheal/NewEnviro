import React, { useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa6";
import CreateMilestone from "./CreateMilestone";


function MilestoneContainer(props) {
  const [showFilter, setShowFilter] = useState(false);
  const [jobData, setJobData] = useState({});

  const handleSubmitForm = () => {
    handleAddJob();
    setShowFilter(false);
    console.log(jobData);
  };

  const handleCloseFilter = () => {
    setShowFilter(false);
  };

  const handleAddJob = async () => {

  };

  const handleSelect = () => {
    setShowFilter(true);
  };

  const handleMilestoneDataChange = useCallback((data) => {
    setJobData(data);
    // console.log(data);
  }, []);

  return (
    <div>
      <Button
        id="dropdown-basic-button"
        variant="dark"
        size="sx"
        onClick={handleSelect}
      >
        <div className="d-flex align-items-center gap-1">
          <FaPlus /> <div className="pdt02">Create Milestone</div>
        </div>
      </Button>
      <Modal show={showFilter} onHide={handleCloseFilter} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add Milestone</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-createnew">
          <CreateMilestone onDataChange={handleMilestoneDataChange} />
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

export default MilestoneContainer;
