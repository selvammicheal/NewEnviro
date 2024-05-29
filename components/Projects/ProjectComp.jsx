"use client";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IoSearchOutline } from "react-icons/io5";
import ProjectDatatable from "@/components/common/ProjectDatatable";
import { Box, Grid } from "@mui/material";
import { Card, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Filter from "@/components/common/FilterItems/Filter";
import Pagination from "@mui/material/Pagination";
import CkEditorTwo from "../common/CkEditor/CkEditorTwo";
import { FaPlus } from "react-icons/fa6";
import { GrDownload } from "react-icons/gr";
import { VscFilter } from "react-icons/vsc";
import FilterItemsProject from "../common/FilterItemsProject/FilterItemsProject";
import {
  fetchFilteredProjects,
  fetchProjects,
  fetchProjectsBySerach,
  fetchProjectsForFilter,
  fetchProjectsSortBy,
} from "@/services/AllProject";
import CreateProjectModal from "./CreateProjectModal";
import Alert from "@mui/material/Alert";

function ProjectComp(props) {
  const [show, setShow] = useState(false);
  const [clearAll, setClearAll] = useState(false);
  const [projectsSet, setProjectsSet] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [paginzationSize, setPaginationSize] = useState();
  const [sortBasedOn, setSortBasedOn] = useState(null);
  const [sortBasedBy, setSortBasedBy] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [projectCreated, setProjectCreate] = useState(false);
  const [startDate, setStartDate] = useState();
  const [ownerIds, setOwnerIds] = useState([]);
  const [statusState, setStatusState] = useState();
  const [projectIds, setProjectIds] = useState([]);
  const [tempState, setTempState] = useState({});

  useEffect(() => {
    let timer;
    if (projectCreated) {
      timer = setTimeout(() => {
        setProjectCreate(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [projectCreated]);

  const handleCreateSuccess = (data) => {
    setProjectCreate(data);
    fetchData();
  };

  const handleSortData = (sortBy, sortTo) => {
    setSortBasedOn(sortTo);
    setSortBasedBy(sortBy);
    fetchDataBySort(sortBy, sortTo);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue) {
      fetchDataBySearch(searchValue);
    } else {
      fetchData();
    }
  }, [searchValue]);

  const paginationSizeHandler = (data) => {
    const totalCount = data.pageContext.totalFilter;
    const limit = data.pageContext.limit;
    const size = Math.ceil(totalCount / limit);
    setPaginationSize(size);
  };

  const fetchDataBySearch = async (dataparam) => {
    const data = await fetchProjectsBySerach(1, dataparam);
    if (data) {
      setProjectsSet(data);
      setProjectData(data.project);
      setIsLoding(false);
      paginationSizeHandler(data);
    }
  };

  const fetchDataBySort = async (sortBy, sortTo) => {
    const data = await fetchProjectsSortBy(activePage, sortBy, sortTo);
    if (data) {
      setProjectsSet(data);
      setProjectData(data.project);
      setIsLoding(false);
      paginationSizeHandler(data);
    }
  };

  const fetchData = async () => {
    const data = await fetchProjects(activePage);
    if (data) {
      setProjectsSet(data);
      setProjectData(data.project);
      setIsLoding(false);
      paginationSizeHandler(data);
    }
  };

  useEffect(() => {
    if (sortBasedOn === null) {
      fetchData();
    } else {
      fetchDataBySort(sortBasedBy, sortBasedOn);
    }
  }, [activePage]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => {
    setShowFilter(false);
    setStartDate(tempState.startDate);
    setOwnerIds(tempState.ownerIds);
    setStatusState(tempState.statusState);
    setProjectIds(tempState.projectIds);
  };
  const handleShowFilter = () => {
    setShowFilter(true);
    setTempState({
      startDate: startDate,
      ownerIds: ownerIds,
      statusState: statusState,
      projectIds: projectIds,
    });
  };

  const createModelClose = (data) => {
    setShow(false);
  };

  const handleClearAll = async () => {
    setClearAll(!clearAll);
    setStartDate("");
    setOwnerIds([]);
    setStatusState(null);
    setProjectIds([]);
  };

  const pageChangeHandler = (event) => {
    setActivePage(event.target.textContent);
  };

  const handleStartDateState = (data) => {
    setStartDate(data);
  };
  const handleOwnerIdsState = (data) => {
    setOwnerIds(data);
  };
  const handleStatusState = (data) => {
    setStatusState(data);
  };
  const handleProjectIds = (data) => {
    setProjectIds(data);
  };
  const handleFilterSubmit = () => {
    const success = fetchFilterData();

    if (success) {
      setShowFilter(false);
    }
  };

  const fetchFilterData = async () => {
    try {
      const filteredProjects = await fetchFilteredProjects({
        startDate,
        ownerIds,
        statusState,
        projectIds,
      });
      setProjectsSet(filteredProjects);
      setProjectData(filteredProjects.project);
      return true;
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <div className="alert-container">
        {projectCreated && (
          <Alert severity="success">Project Has Been Created !</Alert>
        )}
      </div>
      <div className="projects-parent">
        <div className="projects-sub-parent">
          <Form.Control
            type="text"
            placeholder="Search anything here"
            className="project-searchbar"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <IoSearchOutline className="project-search-icon" />
        </div>
        <Button variant="dark" size="sm" onClick={handleShow}>
          <div className="d-flex align-items-center gap-1">
            <FaPlus /> <div className="pdt02">Create Project</div>
          </div>
        </Button>
      </div>
      <div className="project-action-bar">
        <p className="fw-bold">Details:</p>
        <div className="d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            size="sm"
            className="project-download-button"
          >
            <GrDownload />
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleShowFilter}
          >
            <VscFilter />
          </Button>
        </div>
      </div>
      <div className="project-table-container">
        {isLoding ? (
          "loding"
        ) : (
          <ProjectDatatable
            data={projectData}
            handleSortData={handleSortData}
          />
        )}
      </div>
      <div className="pagination-container">
        <Pagination
          count={paginzationSize}
          activePage={activePage}
          onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)}
        />
      </div>
      {show ? (
        <CreateProjectModal
          show={show}
          createModelClose={createModelClose}
          handleCreateSuccess={handleCreateSuccess}
        />
      ) : null}

      <Modal show={showFilter} onHide={handleCloseFilter} size="lg">
        <div className="filter-modal-title">
          <p className="fw-bolder">Filter</p>
          <p
            className="fw-bolder clear-all-button"
            onClick={() => handleClearAll()}
          >
            Clear All
          </p>
        </div>
        <Modal.Body>
          <FilterItemsProject
            clearAll={clearAll}
            handleStartDateState={handleStartDateState}
            handleOwnerIdsState={handleOwnerIdsState}
            handleStatusState={handleStatusState}
            handleProjectIds={handleProjectIds}
            statusState={statusState}
            startDates={startDate}
            projectIds={projectIds}
            ownerIds={ownerIds}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleCloseFilter}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleFilterSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectComp;
