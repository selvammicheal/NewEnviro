import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { IoSearchOutline } from "react-icons/io5";

function ByDependencyProject({ clearAll }) {
  const [isChecked, setIsChecked] = useState({
    // "Dependency 1": false,
    // "Dependency 2": false,
    // "Dependency 3": false,
    // "Dependency 4": false,
    // "Dependency 5": false,
    // "Dependency 6": false,
    // "Dependency 7": false,
    // "Dependency 8": false,
    // "Dependency 9": false,
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
    return Object.keys(isChecked).filter((name) =>
      name.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  return (
    <div>
      <div className="filteritems-parent">
        <Form.Control
          type="text"
          placeholder="Search anything here"
          className="search-container-filteritems"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <IoSearchOutline className="search-icon-filteritems" />
      </div>
      <p className="pdt2 pdb gray-color">Dependency</p>
      <Form className="responsive-filter-scroll">
        {filterCheckboxes().map((name, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            id={`checkbox-${index}`}
            label={name}
            checked={isChecked[name]}
            onChange={() => handleCheckboxChange(name)}
            className="pdb"
          />
        ))}
      </Form>
    </div>
  );
}

export default ByDependencyProject;
