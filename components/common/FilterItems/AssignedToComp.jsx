import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { IoSearchOutline } from "react-icons/io5";
import { fetchPeople, fetchPeopleBySearch } from "@/services/People";
import { useDispatch, useSelector } from "react-redux";
import { getAdvanceFilter } from "@/redux/action/myteam/advanceFilterAction";

function AssignedToComp() {
  const dispatch = useDispatch();
  const advanceFilter = useSelector((state) => state.advanceFilter);
  console.log("advanceFilter..............", advanceFilter);
  const [isChecked, setIsChecked] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [owner, setOwner] = useState([]);
  const [checkedOwnerIds, setCheckedOwnerIds] = useState(advanceFilter.ownerIds);

const handleSearch = async(data) => {
console.log("handleSearch............",data)
const value = await fetchPeopleBySearch(data);
if (value) {
  setOwner(value.people);
}
}

  const fetchAssigneeData = async () => {
    const data = await fetchPeople(1);
    if (data) {
      setOwner(data.people);
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



  const handleCheckboxChange = (id) => {
    let arr = [...checkedOwnerIds];
    if (arr.includes(id)) {
      arr = arr.filter((item) => item != id);
    } else {
      arr.push(id);
    }
    setCheckedOwnerIds(arr);
    dispatch(getAdvanceFilter({ ownerIds: arr }));
  };

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
          onChange={(e) => handleSearch(e.target.value)}
        />
        <IoSearchOutline className="search-icon-filteritems" />
      </div>
      <p className="pdt2 pdb gray-color">Owner</p>
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

export default AssignedToComp;
