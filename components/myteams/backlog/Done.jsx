import { updateJobById } from "@/services/MyTeam";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";

function TableDoneItem(props) {
  const [value, setValue] = useState("");
  const [displayText, setDisplayText] = useState(props.status);
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  const handleItemClick = async(item) => {
    setDisplayText(item);
    const data = {
      "status": item
    }
    try {
      const response = await updateJobById(props.jid, data);
      if (response.status === true) {
        console.log("Job has been updated")
      }
      else if (response.status === false) {
        console.log("Job has not been updated")
      }

    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const getColor = (text) => {
    switch (text) {
      case "Done":
        return "#4BC766"; // Green
      case "In Progress":
        return "#FFC670"; // Blue
      case "Ready For QA":
        return "#45C1FF"; // Yellow
      case "To-do":
        return "#88898A"; // Grey
      default:
        return "#88898A"; // Default color
    }
  };

  const data = ["Done", "In Progress", "Ready For QA", "To-do"];

  return (
    <div className="done-parent">
      <button
        className="status-button status-button-extra"
        style={{ backgroundColor: getColor(displayText) }}
      >
        {displayText}
      </button>
      <Dropdown>
        <Dropdown.Toggle
          className="assignee-button-dropdown "
          id="dropdown-custom-components"
        >
          <SlArrowDown />
          {/* Add the icon here */}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={handleInputChange}
            value={value}
          />
          <ul className="list-unstyled">
            {data
              .filter((item) =>
                value
                  ? item.toLowerCase().startsWith(value.toLowerCase())
                  : true
              )
              .map((item, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </Dropdown.Item>
              ))}
          </ul>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default TableDoneItem;
