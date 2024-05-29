import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Checkbox from "@mui/material/Checkbox";
import { SlArrowDown } from "react-icons/sl";
import { fetchPeople, fetchPeopleBySearch } from "@/services/People";
import { fetchEpic, fetchEpicBySearch } from "@/services/MyTeam";
import { useDispatch, useSelector } from "react-redux";
import { getlocalFilter } from "@/redux/action/myteam/localFilterAction";

function EpicItems(props) {
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [epic, setEpic] = useState([]);

  const dispatch = useDispatch();
  const localFilter = useSelector((state) => state.localFilter);
  console.log("localFilter..............", localFilter);

  useEffect(()=>{
    setSelectedItems(localFilter.epics)
  },[localFilter])

  const fetchEpicData = async () => {
    const data = await fetchEpic(1);
    if (data) {
      setEpic(data.epic)
    }
  };

  useEffect(() => {
    fetchEpicData();
  }, []);

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    const data = await fetchEpicBySearch(inputValue);
    if (data) {
      setEpic(data.epic);
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId];
      dispatch(getlocalFilter({ epics: updatedSelectedItems }));
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
        <p>Epic </p>
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
          {epic &&
            epic.map((item) => (
              <Dropdown.Item key={item._id} as="li">
                <div className="d-flex align-items-center">
                  <Checkbox
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleCheckboxChange(item._id)}
                    onClick={handleCheckboxClick} // Prevents dropdown from closing
                  />
                  <span>{item.title}</span>
                </div>
              </Dropdown.Item>
            ))}
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default EpicItems;
