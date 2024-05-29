import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";

const data = ["In Progress", "To Do", "Done", "QA"];

function StatusCategory() {
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleCheckboxClick = (e, item) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedItems((prevSelected) => [...prevSelected, item]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem !== item)
      );
    }
  };

  const handleItemClick = (item) => {
    setValue("");
    setSelectedItems((prevSelected) => [...prevSelected, item]);
  };

  return (
    <Dropdown className="filter-dropdown-button">
      <Dropdown.Toggle
        className="dropdown-toggle-statuscategory"
        id="dropdown-custom-components"
      >
        <p>Status Category </p>
        <span className="filter-span">
          {selectedItems.length === 0 ? "" : `(${selectedItems.length})`}
        </span>
        <SlArrowDown className="gray-color padding-03" />{" "}
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
              value ? item.toLowerCase().startsWith(value.toLowerCase()) : true
            )
            .map((item, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleItemClick(item)}
                className="dropdown-hover-custom d-flex" // Apply CSS class here
              >
                <Checkbox
                  checked={selectedItems.includes(item)}
                  onClick={(e) => handleCheckboxClick(e, item)}
                />
                <p className="name-container-dropdown">{item}</p>
              </Dropdown.Item>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default StatusCategory;
