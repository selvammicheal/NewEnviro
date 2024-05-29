import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";

import { useDispatch, useSelector } from "react-redux";
import { getlocalFilter } from "@/redux/action/myteam/localFilterAction";


const data = ["Task", "Feedback", "Correction"];

function TypeItems() {
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();
  const localFilter = useSelector((state) => state.localFilter);
  console.log("localFilter..............", localFilter);

  useEffect(()=>{
    setSelectedItems(localFilter.types)
  },[localFilter])


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleCheckboxClick = (e, item) => {
    e.stopPropagation();
    let updatedSelectedItems;
    if (e.target.checked) {
      updatedSelectedItems = [...selectedItems, item];
    } else {
      updatedSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
    }
    setSelectedItems(updatedSelectedItems);
    // props.handleFilterTypes(updatedSelectedItems);
    dispatch(getlocalFilter({ types: updatedSelectedItems }));
  };

  const handleItemClick = (item) => {
    setValue("");
    setSelectedItems((prevSelected) => [...prevSelected, item]);
  };

  return (
    <Dropdown className="filter-dropdown-button">
      <Dropdown.Toggle
        className="dropdown-toggle-type"
        id="dropdown-custom-components"
      >
        <p>Type </p>
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

export default TypeItems;
