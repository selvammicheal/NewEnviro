import { updateJobById } from "@/services/MyTeam";
import { fetchPeople, fetchPeopleBySearch } from "@/services/People";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";

function Assignee({ ownername, jid }) {
  const [value, setValue] = useState("");
  const [displayText, setDisplayText] = useState(ownername ? getDisplayName(ownername) : 'UN');
  const [owner, setOwner] = useState([])


  function getDisplayName(fullName) {
    const capitalizedText = fullName.substring(0, 2).toUpperCase();
    return capitalizedText
  }

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
    const data = await fetchPeopleBySearch(e.target.value);
    if (data) {
      setOwner(data.people);
    }
  };

  const handeOwner = async (item) => {
    setDisplayText(getDisplayName(item.name))
    const data = {
      "assignee_id": item._id
    }
    try {
      const response = await updateJobById(jid, data);
      if (response.status === true) {
        console.log("Job has been updated")
      }
      else if (response.status === false) {
        console.log("Job has not been updated")
      }

    } catch (error) {
      console.error('Error creating project:', error);
    }
  }


  return (
    <div className="assignee-button-parent">
      <button className="assignee-button avatar-blue">{displayText}</button>
      <Dropdown>
        <Dropdown.Toggle
          className="assignee-button-dropdown "
          id="dropdown-custom-components"
        >
          <SlArrowDown />
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
            {
              owner && owner.map((item) => (
                <Dropdown.Item onClick={() => handeOwner(item)}>
                  {
                    item.name
                  }
                </Dropdown.Item>
              ))
            }

          </ul>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Assignee;
