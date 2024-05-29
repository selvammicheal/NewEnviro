"use client";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineFilterAlt } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { CiGrid42 } from "react-icons/ci";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import dynamic from "next/dynamic";
import TimelineContainer from "../myteams/timeline/TimelineContainer";
import { GrDownload } from "react-icons/gr";
import { VscFilter } from "react-icons/vsc";
import { SlGrid } from "react-icons/sl";

const AssigneeFilter = dynamic(() => import("../myteams/common/Assignee"), {
  ssr: false,
});

const SortFilter = dynamic(() => import("../myteams/common/SortFilter"), {
  ssr: false,
});

const StatusCategory = dynamic(
  () => import("../myteams/common/StatusCategory"),
  {
    ssr: false,
  }
);

const Timeline = dynamic(() => import("../myteams/timeline/Timeline"), {
  ssr: false,
});

const Kanban = dynamic(() => import("../myteams/kanban/Kanban"), {
  ssr: false,
});
const TypeItems = dynamic(() => import("../myteams/common/Type"), {
  ssr: false,
});
const EpicItems = dynamic(() => import("../myteams/common/Epic"), {
  ssr: false,
});
const GroupByItems = dynamic(() => import("../myteams/common/GroupBy"), {
  ssr: false,
});

const Backlog = dynamic(() => import("../myteams/backlog/Backlog"), {
  ssr: false,
});
const CreateNewButton = dynamic(
  () => import("@/components/myteams/createnewbutton/CreateNewButton"),
  {
    ssr: false,
  }
);
const Filter = dynamic(() => import("@/components/common/FilterItems/Filter"), {
  ssr: false,
});

function MyWorkContainer(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeButton, setActiveButton] = useState("Kanban");
  const [showModalForAll, setShowModalForAll] = useState(false);
  const [showBackLogModal, setShowBacklogModal] = useState(false);

  const handleShowModalForAll = (data) => {
    if (data === true) {
      setShowModalForAll(true);
    } else {
      setShowModalForAll(false);
    }
  };

  const handleShowBacklogModalForAll = (data) => {
    if (data === true) {
      setShowBacklogModal(true);
    } else {
      setShowBacklogModal(false);
    }
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const [showFilterModal, setShowFilterModal] = useState(false);
  const handleCloseFilterModal = () => setShowFilterModal(false);
  const handleShowFilterModal = () => setShowFilterModal(true);
  const handleCancelFilter = () => {
    setShowFilterModal(false);
  };
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [activeOwner, setActiveOwner] = useState(null);
  const handleAvatarClick = (alt) => {
    setActiveOwner(alt);
  };
  const [clearAll, setClearAll] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  const handleClearAll = () => {
    setClearAll(!clearAll);
  };

  const [selectedButtons, setSelectedButtons] = useState([]);

  const toggleSelected = (buttonIndex) => {
    if (selectedButtons.includes(buttonIndex)) {
      setSelectedButtons(
        selectedButtons.filter((index) => index !== buttonIndex)
      );
    } else {
      setSelectedButtons([...selectedButtons, buttonIndex]);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="projects-sub-parent">
          <Form.Control
            type="text"
            placeholder="Search anything here"
            className="project-searchbar"
          />
          <IoSearchOutline className="project-search-icon" />
        </div>
        <CreateNewButton
          showModalForAll={showModalForAll}
          handleShowModalForAll={handleShowModalForAll}
          showBackLogModal={showBackLogModal}
          handleShowBacklogModalForAll={handleShowBacklogModalForAll}
        />
        {/* <CreateNewButton showModalForAll={showModalForAll} handleShowModalForAll={handleShowModalForAll} showBackLogModal={showBackLogModal} handleShowBacklogModalForAll={handleShowBacklogModalForAll} /> */}
      </div>
      <div className="d-flex justify-content-between pdt2">
        <ButtonGroup aria-label="Basic example" size="sm">
          <Button
            variant={activeButton === "Backlog" ? "dark" : "outline-dark"}
            onClick={() => handleButtonClick("Backlog")}
            className="project-button"
          >
            <SlGrid className="w-1r" /> Backlog
          </Button>
          <Button
            variant={activeButton === "Kanban" ? "dark" : "outline-dark"}
            onClick={() => handleButtonClick("Kanban")}
            className="project-button"
          >
            <SlGrid className="w-1r" /> Kanban
          </Button>
          <Button
            variant={activeButton === "Timeline" ? "dark" : "outline-dark"}
            onClick={() => handleButtonClick("Timeline")}
            className="project-button"
          >
            <SlGrid className="w-1r" /> Timeline
          </Button>
        </ButtonGroup>
        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" size="sm" className="mrr03">
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
      <div className="d-flex justify-content-between pdt15">
        <div className="cus-button-group">
          <button
            className={`cus-button ${
              selectedButtons.includes(0) ? "selected" : ""
            } avatar-pink`}
            onClick={() => toggleSelected(0)}
          >
            AR
          </button>
          <p className="pdl pdt03">Arun Kumar</p>
        </div>
        {activeButton === "Backlog" ? (
          <div className="d-flex justify-content-between">
            <AssigneeFilter />
            <EpicItems />
            <TypeItems />
            <SortFilter />
          </div>
        ) : activeButton === "Kanban" ? (
          <div className="d-flex justify-content-between">
            <GroupByItems />
            <EpicItems />
            <TypeItems />
          </div>
        ) : (
          <div className="d-flex justify-content-between">
            <StatusCategory />
            <EpicItems />
            <TypeItems />
          </div>
        )}

        <Button variant="outline-dark" size="sm" className="project-button">
          Complete Milestone
        </Button>
      </div>
      <div className="mrt04">
        {activeButton === "Backlog" ? (
          <Backlog
            handleShowBacklogModalForAll={handleShowBacklogModalForAll}
          />
        ) : activeButton === "Kanban" ? (
          <Kanban
            activeOwner={activeOwner}
            handleShowModalForAll={handleShowModalForAll}
          />
        ) : (
          <TimelineContainer />
        )}
      </div>
      <Modal show={showFilter} onHide={handleCloseFilter} size="lg">
        <div className="modal-title-myteam">
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
}

export default MyWorkContainer;
