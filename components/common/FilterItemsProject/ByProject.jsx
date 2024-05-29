import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { IoSearchOutline } from "react-icons/io5";
import { fetchPeople } from "@/services/People";
import { fetchProjectsForFilter } from "@/services/AllProject";

function ByProject({ clearAll, handleProject, projectIds }) {
  const [isChecked, setIsChecked] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [owner, setOwner] = useState(projectIds);
  const [checkedOwnerIds, setCheckedOwnerIds] = useState([]);

  useEffect(() => {
    setCheckedOwnerIds(projectIds);
  }, [projectIds]);

  const fetchAssigneeData = async () => {
    const data = await fetchProjectsForFilter(1);
    if (data) {
      setOwner(data.project);
    }
  };

  useEffect(() => {
    fetchAssigneeData();
  }, []);

  useEffect(() => {
    if (owner && owner.length > 0) {
      const initialCheckedState = owner.reduce((acc, person) => {
        acc[person._id] = false;
        return acc;
      }, {});
      setIsChecked(initialCheckedState);
    }
  }, [owner]);

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

  const handleCheckboxChange = (id) => {
    // setIsChecked((prevState) => {
    //   const newState = {
    //     ...prevState,
    //     [id]: !prevState[id],
    //   };
    //   updateCheckedOwnerIds(newState);
    //   return newState;
    // });
    let arr = [...checkedOwnerIds];
    if (arr.includes(id)) {
      arr = arr.filter((item) => item != id);
    } else {
      arr.push(id);
    }
    setCheckedOwnerIds(arr);
    handleProject(arr);
  };

  // const updateCheckedOwnerIds = (isCheckedState) => {
  //   const checkedIds = Object.keys(isCheckedState).filter(
  //     (id) => isCheckedState[id]
  //   );
  //   setCheckedOwnerIds(checkedIds);
  //   handleProject(checkedIds);
  // };

  const filterCheckboxes = () => {
    return owner.filter(
      (person) =>
        person.name &&
        person.name.toLowerCase().includes(searchInput.toLowerCase())
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
      <p className="pdt2 pdb gray-color">Projects</p>
      <Form className="responsive-filter-scroll">
        {filterCheckboxes().map((person) => (
          <Form.Check
            key={person._id}
            type="checkbox"
            id={`checkbox-${person._id}`}
            label={person.name}
            checked={checkedOwnerIds.includes(person._id)}
            onChange={() => handleCheckboxChange(person._id)}
            className="pdb"
          />
        ))}
      </Form>
    </div>
  );
}

export default ByProject;
