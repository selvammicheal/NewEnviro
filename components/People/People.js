"use client";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSort } from "react-icons/fa";
import { PiTrash } from "react-icons/pi";
import CustomDropdown from "./CustomDropdown";


const People = () => {
  const person = [
    { name: "Dev Johari", role: "Developers" },
    { name: "Arun", role: "Developers" },
    { name: "Ashutosh", role: "Developers" },
    { name: "Pawan khandelwan", role: "Developers" },
    { name: "Unnamed", role: "Developers" },
    { name: "Unnamed", role: "Developers" },
    { name: "Unnamed", role: "Developers" },
    { name: "Unnamed", role: "Developers" },
  ];

  const tempColor = ["#F0A7ED", "#B1A7F0", "#82E8D6", "#A1E888"];

  const [data, setData] = useState(person);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const [checkList, setCheckList] = useState([]);
  const [isAllChecked, setAllChecked] = useState(false);

  const searchInput = (event) => {
    setSearch(event.target.value);
  };

  const singleChecker = (index) => {
    let arr = [...checkList];
    if (!arr.includes(index)) {
      arr.push(index);
    } else {
      arr = arr.filter((el) => el != index);
    }
    if (arr.length < data.length) {
      setAllChecked(false);
    }
    if (arr.length >= data.length) {
      setAllChecked(true);
    }
    setCheckList(arr);
  };

  const allChecker = () => {
    let arr = [...checkList];
    if (!isAllChecked) {
      setCheckList(data.map((el, ind) => ind));
      setAllChecked(true);
    } else {
      arr = [];
      setCheckList(arr);
      setAllChecked(false);
    }
  };

  return (
    <div>
      <div>
        <div className="m-2 mb-4 d-flex justify-content-between align-items-center">
          <div className="input-container">
            <div className="search-icon-container">
              <CiSearch className="people-search-icon" />
            </div>
            <input
              className="people-search "
              type="text"
              placeholder="Search anything here"
              onChange={searchInput}
              value={search}
            />
          </div>
          <div className="submit-button-container">
            <button className="people-add-new px-4 d-flex align-items-center gap-2">
              <span className="font15">+</span>
              <span className="fontw500"> Add New </span>
            </button>
          </div>
        </div>
        <div className="m-2 people-table-container">
          <table className="people-table">
            <thead>
              <tr className="table-row">
                <th className="checkbox-field">
                  <input
                    class="form-check-input-people"
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={allChecker}
                  />
                </th>
                <th className="name-field">
                  Name
                  <FaSort className="mrl04 its-pointer" onClick={handleSort} />
                </th>
                <th className="role-field">Role</th>
                <th className="action-field">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((el) =>
                  el.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => (
                  <tr key={index} className="table-row data">
                    <td className="checkbox-field data">
                      <input
                        class="form-check-input-people"
                        type="checkbox"
                        checked={checkList.includes(index)}
                        onChange={() => singleChecker(index)}
                      />
                    </td>
                    <td className="name-field data">
                      <Avatar
                        style={{
                          backgroundColor: tempColor[index]
                            ? tempColor[index]
                            : "#F0A7ED",
                          height: "2.4rem",
                          width: "2.4rem",
                        }}
                      >
                        {item.name.charAt(0)}
                      </Avatar>
                      <p className="name-people-table">{item.name}</p>
                    </td>
                    <td className="role-field data">
                      <CustomDropdown selected={item.role} />
                    </td>
                    <td className="action-field data">
                      <PiTrash
                        className="table-trash-icon"
                        onClick={() => {
                          setData(data.filter((itemm) => itemm != item));
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default People;
