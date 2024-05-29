import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
import { fetchPeopleList } from "@/services/People";

function Name({ formData, setFormData }) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleItemClick = (item, name) => {
    setValue(item);
    setFormData({ ...formData, email: item, name: name });
  };

  const fetchDataSearch = async () => {
    if (value == "") {
      // setFormData({ ...data, name: null });
      setData([]);
      return;
    }
    const data = await fetchPeopleList(value);
    if (data) {
      // setProjectsSet(data);
      setData(data.data);
      setLoading(false);
      // paginationSizeHandler(data);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      fetchDataSearch(value);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  // useState(()=>{console.log(form)},[data])

  return (
    <>
      <div className="position-relative">
        <Form.Control
          className="my-1 wid-full"
          placeholder="Enter the name or email..."
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
        {show && data && data.length > 0 && (
          <ul className="list-unstyled dropdown-people-add">
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  handleItemClick(item.email, item.full_name);
                  setShow(false);
                }}
                className="d-flex dropdown-hover-custom its-pointer flex-column"
              >
                <div className="pdth pdbh b-05-lg bdr04 px-2 mb-2">
                  <p>{item.full_name}</p>
                  <p className="font07 gray-color">{item.email}</p>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Name;
