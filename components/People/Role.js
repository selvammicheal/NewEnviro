import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";

function Name({ formData, setFormData }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleItemClick = (item) => {
    setValue(item);
    setFormData({ ...formData, role: item });
  };

  const data = [
    "Developer",
    "Project Manager",
    "Product Owner",
    "Solution Architect",
    "QA",
    "Business Analyst",
  ];

  return (
    <>
      <div className="position-relative">
        <Form.Control
          className="my-1 wid-full"
          placeholder="Enter the role..."
          onChange={handleInputChange}
          value={value}
          onFocus={() => {
            setShow(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShow(false);
            }, 300);
          }}
        />
        <BsChevronDown className="position-absolute chevron-down-people" />
        {show && (
          <ul className="list-unstyled dropdown-people-add">
            {data
              .filter((item, index) =>
                item.toLowerCase().includes(value.toLowerCase())
              )
              .map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleItemClick(item);
                    setShow(false);
                  }}
                  className="d-flex dropdown-hover-custom its-pointer"
                >
                  <p className="pdth pdbh">{item}</p>
                </div>
              ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Name;
