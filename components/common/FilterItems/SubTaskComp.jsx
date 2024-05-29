import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { IoSearchOutline } from "react-icons/io5";

function SubTaskComp({ clearAll }) {
  const [isChecked, setIsChecked] = useState({
    "Sub Task 1": false,
    "Sub Task 2": false,
    "Sub Task 3": false,
  });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (clearAll) {
      setIsChecked((prevState) => {
        const newState = { ...prevState };
        for (const key in newState) {
          newState[key] = false;
        }
        return newState;
      });
    }
  }, [clearAll]);

  const handleCheckboxChange = (name) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const filterCheckboxes = () => {
    return Object.keys(isChecked).filter((task) =>
      task.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  return (
    <div>
      <div className="searchbar-parent-filter">
        <Form.Control
          type="text"
          placeholder="Search anything here"
          className="searchbar-filter"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <IoSearchOutline className="searchicon-filter" />
      </div>
      <p className="pdt2 pdb gray-color">Sub Task</p>
      <Form className="responsive-filter-scroll">
        {filterCheckboxes().map((task, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            id={`sub-task-${index + 1}`}
            label={`Sub Task ${index + 1}`}
            checked={isChecked[task]}
            onChange={() => handleCheckboxChange(task)}
            className="pdb"
          />
        ))}
      </Form>
    </div>
  );
}

export default SubTaskComp;
