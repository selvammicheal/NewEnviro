"use client"

import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Dropdown from "react-bootstrap/Dropdown";
import { FaSort } from "react-icons/fa";
import { LuMoreVertical } from "react-icons/lu";
import { formatDate, progressCalculator } from "@/utils/Project";
import { useRouter } from 'next/navigation'

function SurveyDatatable({ data, handleSortData }) {
  const [orderBy, setOrderBy] = useState("ASC")
  const router = useRouter()

  const handleNavigation = (projectId) => {
    localStorage.setItem("projectId", projectId);
    router.push('/projectmanagement/myteams');

  };


  const handleSort = (data) => {
    // if (orderBy === "ASC") {
    //   setOrderBy("DESC")
    //   handleSortData("DESC", data)
    // }
    // else {
    //   setOrderBy("ASC")
    //   handleSortData("ASC", data)
    // }
  }


  return (
    <div className="table-responsive people-table-container scrollbar-custom">
      <table className="table table-sm table-datatable mrb00">
        <thead>
          <tr>
            <th scope="col" className="col-head-1">
              <input
                className="form-check-input"
                type="checkbox"
              />
            </th>
            <th scope="col" className="projectdatatable-header-text col-head-2">
              Project Name
            </th>
            <th scope="col" className="projectdatatable-header-text col-head-2">
              Owner
            </th>
            <th
              scope="col"
              className="projectdatatable-header-text col-head-11"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
            <tr className="table-row datas">
                <td  scope="col">
                <input
                // style={{paddingLeft: "1rem !important"}}
                className="form-check-input"
                type="checkbox"
              />
                </td>
                <td>
                    Survey
                </td>
                <td>
                    AGL
                </td>
               <td className="data-cell-option">
                <Dropdown drop="auto">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="dropdown-toggle-button"
                  >
                    <LuMoreVertical />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleNavigation(item._id)}>View</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Settings</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
                
            </tr>
            <tr className="table-row datas">
                <td  scope="col">
                <input
                // style={{paddingLeft: "1rem !important"}}
                className="form-check-input"
                type="checkbox"
              />
                </td>
                <td>
                    Survey
                </td>
                <td>
                    AGL
                </td>
               <td className="data-cell-option">
                <Dropdown drop="auto">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="dropdown-toggle-button"
                  >
                    <LuMoreVertical />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleNavigation(item._id)}>View</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Settings</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
                
            </tr>
          {/* {data.map((item, index) => (
            <tr key={index}>
              <td scope="row" className="data-cell-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={item._id}
                />
              </td>
              <td className="data-cell-2">
                <p>{item.name}</p>
                <div className="d-flex justify-content-between">
                  <ProgressBar
                    variant="danger"
                    now={progressCalculator(item.taskCount,item.completeTaskCount)}
                    className="progress-bar-cell"
                  />
                  <p className="progress-text">{`${progressCalculator(item.taskCount,item.completeTaskCount)}%`}</p>
                </div>
              </td>
              <td className="data-cell-owner">{item.owner}</td>
              <td className="data-cell-type">{item.type}</td>
              <td className="data-cell-status">
                {item.is_active === true ? (
                  <p className="active-status-butt active">{"Active"}</p>
                ) : (
                  <p className="active-status-butt inactive">{"Inactive"}</p>
                )}
              </td>

              <td className="data-cell-startdate">{formatDate(item.start_date)}</td>
              <td className="data-cell-taskcreated">{item.taskCount}</td>
              <td className="data-cell-taskcomplete">{item.completeTaskCount}</td>
              <td className="data-cell-dep">{item.dependency}</td>
              <td className="data-cell-stack">{item.stakeholder}</td>
              <td className="data-cell-option">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="dropdown-toggle-button"
                  >
                    <LuMoreVertical />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleNavigation(item._id)}>View</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Settings</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default SurveyDatatable;
