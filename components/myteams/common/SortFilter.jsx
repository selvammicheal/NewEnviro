import React, { useState ,useEffect} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { SlArrowDown } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { getlocalFilter } from "@/redux/action/myteam/localFilterAction";

const data = ["Newly", "Oldest", "None"];

function SortFilter(props) {
  const [value, setValue] = useState("");
  const [displayText, setDisplayText] = useState("")

  const dispatch = useDispatch();
  const localFilter = useSelector((state) => state.localFilter);
  console.log("localFilter..............", localFilter);

  useEffect(() => {
    if (localFilter.sort === "DESC") {
      setDisplayText("Newly")
      setValue("Newly")
    } else if (localFilter.sort === "ASC") {
      setDisplayText("Oldest")
      setValue("Oldest")
    }
    else if (localFilter.sort === "") {
      setDisplayText("")
      setValue("")
    }
  }, [localFilter.sort])


  const handleItemClick = (item) => {
    let sortValue = "";
    if (item === "Newly") {
      sortValue = "DESC";
    } else if (item === "Oldest") {
      sortValue = "ASC";
    }
    setValue(item);
    dispatch(getlocalFilter({ sort: sortValue }));
  };
  return (
    <Dropdown className="filter-dropdown-button">
      <Dropdown.Toggle
        className="dropdown-toggle-sortfilter"
        id="dropdown-custom-components"
      >
        <p>Sort </p>
        <span className="filter-span">{displayText}</span>
        <SlArrowDown className="gray-color padding-03" />{" "}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form>
          {data.map((item, index) => (
            <Form.Check
              key={index}
              type="radio"
              id={item}
              name="sort"
              label={item}
              checked={value === item}
              onChange={() => handleItemClick(item)}
            />
          ))}
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortFilter;
