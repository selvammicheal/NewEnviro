"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { IoSearchOutline } from "react-icons/io5";
import Project from "./common/Project";
import Type from "./common/Type";
import Status from "./common/Status";
import Assignee from "./common/Assignee";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdOutlineFileDownload } from "react-icons/md";
import dynamic from "next/dynamic";
import IssueTable from "./IssueTable";
import Pagination from "@mui/material/Pagination";

const Filter = dynamic(() => import("@/components/common/FilterItems/Filter"), {
  ssr: false,
});

const data = [
  {
    id: 1,
    projectName: "Enviro",
    type: "Milestone",
    epicName: "Epic Enviro",
    totalAssignee: "Ashutosh",
    resolution: "Resolved",
    dueDate: "15 Apr 2024",
    createdDate: "10 Mar 2024",
  },
  {
    id: 2,
    projectName: "TimeLine",
    type: "Recurring",
    epicName: "Epic Enviro",
    totalAssignee: "Dev",
    resolution: "In Progress",
    dueDate: "20 Apr 2024",
    createdDate: "12 Mar 2024",
  },
  {
    id: 3,
    projectName: "KanBan",
    type: "Sprint",
    epicName: "Epic Enviro",
    totalAssignee: "Arun",
    resolution: "Unresolved",
    dueDate: "25 Apr 2024",
    createdDate: "13 Mar 2024",
  },
  {
    id: 4,
    projectName: "BackLog",
    type: "Story",
    epicName: "Epic Enviro",
    totalAssignee: "Arun",
    resolution: "Unresolved",
    dueDate: "30 Apr 2024",
    createdDate: "14 Mar 2024",
  },
  {
    id: 5,
    projectName: "Jira",
    type: "Task",
    epicName: "Epic Atlassian",
    totalAssignee: "Dev",
    resolution: "Resolved",
    dueDate: "05 May 2024",
    createdDate: "15 Mar 2024",
  },
  {
    id: 6,
    projectName: "EP",
    type: "Bug",
    epicName: "Epic FMP",
    totalAssignee: "Ashutosh",
    resolution: "In Progress",
    dueDate: "10 May 2024",
    createdDate: "16 Mar 2024",
  },
  {
    id: 7,
    projectName: "FMP",
    type: "Sub-Task",
    epicName: "Epic FMP",
    totalAssignee: "Ashutosh",
    resolution: "Unresolved",
    dueDate: "15 May 2024",
    createdDate: "17 Mar 2024",
  },
  {
    id: 8,
    projectName: "Nexa",
    type: "Milestone",
    epicName: "Epic MSIL",
    totalAssignee: "Dev",
    resolution: "Unresolved",
    dueDate: "20 May 2024",
    createdDate: "18 Mar 2024",
  },
  {
    id: 9,
    projectName: "Arena",
    type: "Sprint",
    epicName: "Epic MSIL",
    totalAssignee: "Arun",
    resolution: "Resolved",
    dueDate: "25 May 2024",
    createdDate: "19 Mar 2024",
  },
  {
    id: 10,
    projectName: "TRV",
    type: "Recurring",
    epicName: "Epic MSIL",
    totalAssignee: "Arun",
    resolution: "In Progress",
    dueDate: "30 May 2024",
    createdDate: "20 Mar 2024",
  },
  {
    id: 11,
    projectName: "ProjectX",
    type: "Milestone",
    epicName: "EpicX",
    totalAssignee: "John Doe",
    resolution: "Resolved",
    dueDate: "10 Jun 2024",
    createdDate: "21 Mar 2024",
  },
  {
    id: 12,
    projectName: "ProjectY",
    type: "Task",
    epicName: "EpicY",
    totalAssignee: "Jane Smith",
    resolution: "In Progress",
    dueDate: "15 Jun 2024",
    createdDate: "22 Mar 2024",
  },
  {
    id: 13,
    projectName: "ProjectZ",
    type: "Bug",
    epicName: "EpicZ",
    totalAssignee: "Bob Johnson",
    resolution: "Unresolved",
    dueDate: "20 Jun 2024",
    createdDate: "23 Mar 2024",
  },
  {
    id: 14,
    projectName: "ProjectA",
    type: "Recurring",
    epicName: "EpicA",
    totalAssignee: "Alice Brown",
    resolution: "Resolved",
    dueDate: "25 Jun 2024",
    createdDate: "24 Mar 2024",
  },
  {
    id: 15,
    projectName: "ProjectB",
    type: "Sprint",
    epicName: "EpicB",
    totalAssignee: "Tom White",
    resolution: "In Progress",
    dueDate: "30 Jun 2024",
    createdDate: "25 Mar 2024",
  },
  {
    id: 16,
    projectName: "ProjectC",
    type: "Story",
    epicName: "EpicC",
    totalAssignee: "Emily Green",
    resolution: "Unresolved",
    dueDate: "05 Jul 2024",
    createdDate: "26 Mar 2024",
  },
  {
    id: 17,
    projectName: "ProjectD",
    type: "Sub-Task",
    epicName: "EpicD",
    totalAssignee: "Chris Black",
    resolution: "Resolved",
    dueDate: "10 Jul 2024",
    createdDate: "27 Mar 2024",
  },
  {
    id: 18,
    projectName: "ProjectE",
    type: "Milestone",
    epicName: "EpicE",
    totalAssignee: "Sarah Red",
    resolution: "In Progress",
    dueDate: "15 Jul 2024",
    createdDate: "28 Mar 2024",
  },
  {
    id: 19,
    projectName: "ProjectF",
    type: "Task",
    epicName: "EpicF",
    totalAssignee: "Mike Gray",
    resolution: "Unresolved",
    dueDate: "20 Jul 2024",
    createdDate: "29 Mar 2024",
  },
  {
    id: 20,
    projectName: "ProjectG",
    type: "Bug",
    epicName: "EpicG",
    totalAssignee: "Emma Purple",
    resolution: "Resolved",
    dueDate: "25 Jul 2024",
    createdDate: "30 Mar 2024",
  },
];

const IssuesContainer = () => {
  //   const [projectData, setProjectData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [searchInput, setSearchInput] = useState("");
  const [clearAll, setClearAll] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchInput(value);

    const newData = data.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(newData);
  };

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  const handleClearAll = () => {
    setClearAll(!clearAll);
  };

  const handleFilterChange = (filters) => {
    // Make a copy of the original data array
    let filteredData = [...data];

    // Filter by project name
    if (filters.project && filters.project.length > 0) {
      filteredData = filteredData.filter((item) =>
        filters.project.includes(item.projectName)
      );
    }

    // Filter by type
    if (filters.type && filters.type.length > 0) {
      filteredData = filteredData.filter((item) =>
        filters.type.includes(item.type)
      );
    }

    // Filter by status
    if (filters.status && filters.status.length > 0) {
      filteredData = filteredData.filter((item) =>
        filters.status.includes(item.resolution)
      );
    }

    // Filter by assignee
    if (filters.assignee && filters.assignee.length > 0) {
      filteredData = filteredData.filter((item) =>
        filters.assignee.includes(item.totalAssignee)
      );
    }

    // Update the filtered data state
    setFilteredData(filteredData);
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const uniqueTypes = [...new Set(data.map((item) => item.type))];
  const uniqueStatus = [...new Set(data.map((item) => item.resolution))];
  const uniqueAssignee = [...new Set(data.map((item) => item.totalAssignee))];

  return (
    <div>
      {/* Search bar */}
      <div className="issues-parent">
        <Form.Control
          type="text"
          placeholder="Search anything here"
          onChange={handleSearch} // Bind handleSearch to onChange event
          value={searchInput}
          className="searchbar-issues"
        />
        <IoSearchOutline className="search-icon-issues " />
      </div>

      {/* Filters */}
      <div className="d-flex justify-content-between pdt15">
        <div className="d-flex">
          <Project
            data={data.map((item) => item.projectName)}
            onChange={handleFilterChange}
          />
          <Type data={uniqueTypes} onChange={handleFilterChange} />
          <Status data={uniqueStatus} onChange={handleFilterChange} />
          <Assignee data={uniqueAssignee} onChange={handleFilterChange} />
        </div>
        <div className="d-flex justify-content-between">
          {/* Filter buttons */}
          {/* <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleShowFilter}
          >
            <MdOutlineFilterAlt />
          </Button> */}
          &nbsp;&nbsp;&nbsp;
          <Button variant="outline-secondary" size="sm" className="mrr03">
            <MdOutlineFileDownload className="icon-react-cus"/>
          </Button>
        </div>
      </div>

      {/* IssueTable */}
      <div className="pdt15">
        <IssueTable data={currentEntries} />
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <Pagination
          count={Math.ceil(filteredData.length / entriesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>

      {/* Filter modal */}
      <Modal show={showFilter} onHide={handleCloseFilter} size="lg">
        <div className="d-flex justify-content-between pda15 bb-1-g">
          <p className="fw-bolder">Filter</p>
          <p className="fw-bolder its-pointer" onClick={() => handleClearAll()}>
            Clear All
          </p>
        </div>
        <Modal.Body>
          <Filter clearAll={clearAll} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleCloseFilter}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleCloseFilter}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IssuesContainer;
