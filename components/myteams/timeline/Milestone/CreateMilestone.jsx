"use client";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const CreateMilestone = ({ onDataChange }) => {
  const [name, setName] = useState("")
  const [duration, setDuration] = useState("Select Duration");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const maxCharacters = 100;

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        name,
        duration,
        description,
        startDate,
        endDate,
      });
    }
  }, [name, duration, description, startDate, endDate]);

  const handleChangeDescription = (event) => {
    if (event.target.value.length <= maxCharacters) {
      setDescription(event.target.value);
    }
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDuration = (event) => {
    const selectedDuration = event.target.value;
    setDuration(selectedDuration);

    if (selectedDuration !== "custom") {
      const today = new Date().toISOString().split("T")[0];
      setStartDate(today);
      let calculatedEndDate = calculateEndDate(today, selectedDuration);
      setEndDate(calculatedEndDate);
    } else {
      setStartDate("");
      setEndDate("");
    }
  };


  const handleChangeStartDate = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);

    if (duration && duration !== "custom") {
      let calculatedEndDate = calculateEndDate(newStartDate, duration);
      setEndDate(calculatedEndDate);
    }
  };

  const calculateEndDate = (startDate, duration) => {
    const start = new Date(startDate);
    let end = new Date(start);

    switch (duration) {
      case "1 week":
        end.setDate(start.getDate() + 7);
        break;
      case "2 week":
        end.setDate(start.getDate() + 14);
        break;
      case "3 week":
        end.setDate(start.getDate() + 21);
        break;
      default:
        end = "";
        break;
    }

    if (end) {
      return end.toISOString().split("T")[0];
    }
    return "";
  };

  const charactersLeft = maxCharacters - description.length;

  const handleChangeEndDate = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);

    if (duration && duration !== "custom") {
      let calculatedEndDate = calculateEndDate(newStartDate, duration);
      setEndDate(calculatedEndDate);
    }
  };

  return (
    <div>
      <form id="detailsForm">
        <div className="d-flex justify-content-between pdt">
          <div className="half-input-details">
            Name
            <Form.Control type="text" className="input-details" name="name" value={name} onChange={handleChangeName} />
          </div>
          <div className="half-input-details">
            Duration
            <Select
              value={duration}
              onChange={handleChangeDuration}
              sx={{ maxHeight: "2.5rem" }}
            >
              <MenuItem value={"1 week"}>1 week</MenuItem>
              <MenuItem value={"2 week"}>2 week</MenuItem>
              <MenuItem value={"3 week"}>3 week</MenuItem>
              <MenuItem value={"custom"}>Custom</MenuItem>
            </Select>
          </div>
        </div>

        <div className="input-row-details">
          <div className="half-input-details">
            Start Date
            <Form.Control
              type="date"
              className="input-details"
              value={startDate}
              onChange={handleChangeStartDate}
              disabled={duration !== "custom"}
            />
          </div>
          <div className="half-input-details">
            End Date
            <Form.Control
              type="date"
              className="input-details"
              value={endDate}
              disabled={duration !== "custom"}
              onChange={handleChangeEndDate}
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
      </form>
    </div>
  );
};

export default CreateMilestone;
