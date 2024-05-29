"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { IoSearchOutline } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DetailsContainer = () => {
  const [assignee, setAssignee] = useState("Select Assignee");
  const [description, setDescription] = useState("");
  const maxCharacters = 100;

  const handleChangeDescription = (event) => {
    if (event.target.value.length <= maxCharacters) {
      setDescription(event.target.value);
    }
  };

  const handleChangeAssignee = (event) => {
    setAssignee(event.target.value);
  };

  const charactersLeft = maxCharacters - description.length;

  const handleCancel = () => {
    setAssignee("");
    setDescription("");
    document.getElementById("detailsForm").reset();
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button
          variant="outline-dark"
          className="button-details"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="dark" className="button-details">
          Save
        </Button>
      </div>
      <div className="title-details">Details</div>
      <form id="detailsForm">
        <div className="d-flex justify-content-between pdt">
          <div className="half-input-details">
            Name
            <Form.Control type="text" className="input-details" />
          </div>
          <div className="half-input-details">
            Project Type
            <Form.Control type="text" className="input-details" />
          </div>
        </div>

        <div className="input-row-details">
          <div className="half-input-details">
            Start Date
            <Form.Control type="date" className="input-details" />
          </div>
          <div className="half-input-details">
            End Date
            <Form.Control
              type="date"
              placeholder=""
              className="input-details"
            />
          </div>
        </div>

        <div className="input-row-details">
          <div className="wid-full d-flex flex-column">
            Description
            <Form.Control
              as="textarea"
              rows={1}
              value={description}
              onChange={handleChangeDescription}
              className="input-details"
            />
            <div className="char-status-count">{charactersLeft} / 100</div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div className="half-input-details">
            Project Lead
            <Form.Control type="text" className="input-details" />
          </div>
          <div className="half-input-details">
            Default Assignee
            <Select
              value={assignee}
              onChange={handleChangeAssignee}
              sx={{ maxHeight: "2.5rem" }}
            >
              <MenuItem value={"Arun"}>Arun</MenuItem>
              <MenuItem value={"Ashu"}>Ashu</MenuItem>
              <MenuItem value={"Dev"}>Dev</MenuItem>
            </Select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailsContainer;
