"use client";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSort } from "react-icons/fa";
import { PiTrash } from "react-icons/pi";
import CustomDropdown from "./CustomDropdown";
import { FaPlus } from "react-icons/fa6";
import AddPeopleModal from "./AddPeopleModal";
import {
  fetchPeople,
  fetchPeopleList,
  deletePeople,
  updatePeople,
} from "@/services/People";

const PeopleContainer = () => {
  const person = [
    { name: "Dev Johari", role: "Developers", id: 1 },
    { name: "Arun", role: "Developers", id: 2 },
    { name: "Ashutosh", role: "Developers", id: 3 },
    { name: "Pawan khandelwan", role: "Developers", id: 4 },
    { name: "Unnamed", role: "Developers", id: 5 },
    { name: "Unnamed", role: "Developers", id: 6 },
    { name: "Unnamed", role: "Developers", id: 7 },
    { name: "Unnamed", role: "Developers", id: 8 },
  ];

  const tempColor = ["#F0A7ED", "#B1A7F0", "#82E8D6", "#A1E888"];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal); // Toggle the value of openModal
  };

  const handleModalClose = (data) => {
    setOpenModal(data);
  };

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
      setCheckList(data.map((el, ind) => el.id));
      setAllChecked(true);
    } else {
      arr = [];
      setCheckList(arr);
      setAllChecked(false);
    }
  };

  const fetchData = async () => {
    const dataa = await fetchPeople(search);
    if (dataa) {
      setData(dataa.people);
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    const dataa = await deletePeople(id);
    if (dataa) {
      fetchData();
    }
  };

  const updateData = async (id, role) => {
    const dataa = await updatePeople(id, role);
    if (dataa) {
      fetchData();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // fetchData();
  }, [data]);

  const printer = () => {
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

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
              <span className="font15 pdt03">+</span>
              <span className="fontw500 pdt03" onClick={handleOpenModal}>
                Add New
              </span>
            </button>
          </div>
        </div>
        <div className="m-2 people-table-container">
          {loading ? (
            <div className="py-5 text-center">Loading.....</div>
          ) : (
            <table className="people-table wid-full">
              <thead>
                <tr className="table-row">
                  <th className="checkbox-field">
                    <input
                      className="form-check-input-people form-check-input"
                      type="checkbox"
                      checked={isAllChecked}
                      onChange={allChecker}
                    />
                  </th>
                  <th className="name-field">
                    Name
                    <FaSort
                      className="mrl04 its-pointer"
                      onClick={handleSort}
                    />
                  </th>
                  <th className="role-field">Role</th>
                  <th className="action-field">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((el) => el.is_active == true)
                  .map((item, index) => (
                    <tr key={item._id} className="table-row data">
                      <td className="checkbox-field data">
                        <input
                          className="form-check-input-people form-check-input"
                          type="checkbox"
                          checked={checkList.includes(item.id)}
                          onChange={() => singleChecker(item.id)}
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
                          {/* {item.name.charAt(0)} */}
                        </Avatar>
                        <p className="name-people-table">{item.name}</p>
                      </td>
                      <td className="role-field data">
                        <CustomDropdown
                          selected={item.role}
                          updateData={updateData}
                          id={item._id}
                        />
                      </td>
                      <td className="action-field data">
                        <PiTrash
                          className="table-trash-icon"
                          onClick={() => {
                            // setData(data.filter((itemm) => itemm != item));
                            deleteData(item._id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {openModal ? (
        <AddPeopleModal
          handleModalClose={handleModalClose}
          fetchData={fetchData}
          printer={printer}
        />
      ) : null}
    </div>
  );
};

export default PeopleContainer;
