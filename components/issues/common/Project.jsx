import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Project({ data, onChange }) {
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const memoizedOnChange = useCallback(onChange, []);

  useEffect(() => {
    // Call the onChange callback whenever selectedItems change
    memoizedOnChange({ project: selectedItems });
  }, [selectedItems, memoizedOnChange]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleCheckboxClick = (e, item) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItems((prevItems) => [...prevItems, item]);
    } else {
      setSelectedItems((prevItems) =>
        prevItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };

  const handleItemClick = (item) => {
    setValue("");
    setSelectedItems((prevItems) => [...prevItems, item]);
    onChange([...selectedItems, item]);
  };

  const dropdownMenuStyle = {
    maxHeight: "20rem",
    overflowY: "auto",
    overflowX: "hidden",
    height: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#dfdfdf white",
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="dropdown-issue-assignee"
        id="dropdown-custom-components"
      >
        Project{" "}
        {selectedItems.length > 0 && (
          <span className="scheme-orange-text">{`(${selectedItems.length})`}</span>
        )}
        <MdOutlineKeyboardArrowDown className="gray-color icon-react-cus" />
      </Dropdown.Toggle>

      <Dropdown.Menu style={dropdownMenuStyle}>
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
                className="d-flex dropdown-hover-custom" // Apply CSS class here
              >
                <Checkbox
                  onClick={(e) => handleCheckboxClick(e, item)}
                  checked={selectedItems.includes(item)}
                />
                <p className="pdth">{item}</p>
              </Dropdown.Item>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Project;
