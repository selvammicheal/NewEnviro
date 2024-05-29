import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Role from "./Role";
import Name from "./Name";
import { createPeople } from "@/services/People";

function AddPeopleModal({ handleModalClose, fetchData }) {
  const [data, setData] = useState({ is_active: true });
  const [show, setShow] = useState(true);
  const [epic, setEpic] = useState("Select Role");

  const handleChangeEpic = (event) => {
    setEpic(event.target.value);
  };

  const handleClose = (mode) => {
    if (mode == "submit") {
      addPeople();
    }
    setShow(false);
    handleModalClose(false);
  };

  const addPeople = async () => {
    const dataa = await createPeople(data);
    if (dataa) {
      fetchData();
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add People</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <p className="pdt02 pdb06">Name or Email</p>
            <Name formData={data} setFormData={setData} />
          </div>
          <div>
            <p className="pdt02 pdb06">Role</p>
            <Role formData={data} setFormData={setData} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              handleClose("submit");
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddPeopleModal;
