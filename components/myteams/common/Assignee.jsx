import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Checkbox from "@mui/material/Checkbox";
import { SlArrowDown } from "react-icons/sl";
import { fetchPeople, fetchPeopleBySearch } from "@/services/People";

import { useDispatch, useSelector } from "react-redux";
import { getlocalFilter } from "@/redux/action/myteam/localFilterAction";


function AssigneeFilter() {
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [owner, setOwner] = useState([]);



  const dispatch = useDispatch();
  const localFilter = useSelector((state) => state.localFilter);
  console.log("localFilter..............", localFilter);

  useEffect(()=>{
    setSelectedItems(localFilter.ownerIds)
  },[localFilter])

  const fetchAssigneeData = async () => {
    const data = await fetchPeople();
    if (data) {
      setOwner(data.people);
    }
  };

  useEffect(() => {
    fetchAssigneeData();
  }, []);

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    const data = await fetchPeopleBySearch(inputValue);
    if (data) {
      setOwner(data.people);
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId];
      // props.handleFilterAssigneeIds(updatedSelectedItems);
      dispatch(getlocalFilter({ ownerIds: updatedSelectedItems }));
      return updatedSelectedItems;
    });
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();

  };

  return (
    <Dropdown className="filter-dropdown-button">
      <Dropdown.Toggle
        className="dropdown-toggle-assignee"
        id="dropdown-custom-components"
      >
        <p>Assignee </p>
        <span className="filter-span">
          {selectedItems.length === 0 ? "" : `(${selectedItems.length})`}
        </span>
        <SlArrowDown className="gray-color padding-03" />{" "}
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
          {owner &&
            owner.map((item) => (
              <Dropdown.Item key={item._id} as="li">
                <div className="d-flex align-items-center">
                  <Checkbox
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleCheckboxChange(item._id)}
                    onClick={handleCheckboxClick} // Prevents dropdown from closing
                  />
                  <span>{item.name}</span>
                </div>
              </Dropdown.Item>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default AssigneeFilter;
