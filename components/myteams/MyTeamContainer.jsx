"use client";
import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";
import { CiGrid42 } from "react-icons/ci";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import dynamic from "next/dynamic";
import TimelineContainer from "./timeline/TimelineContainer";
import { GrDownload } from "react-icons/gr";
import { VscFilter } from "react-icons/vsc";
import { BsGrid1X2 } from "react-icons/bs";
import { SlGrid } from "react-icons/sl";

import { useDispatch, useSelector } from "react-redux";
import { getAdvanceFilter } from "@/redux/action/myteam/advanceFilterAction";
import { getlocalFilter } from "@/redux/action/myteam/localFilterAction";
import MilestoneContainer from "./timeline/Milestone/MilestoneContainer";


const AssigneeFilter = dynamic(() => import("./common/Assignee"), {
  ssr: false,
});

const SortFilter = dynamic(() => import("./common/SortFilter"), {
  ssr: false,
});

const StatusCategory = dynamic(() => import("./common/StatusCategory"), {
  ssr: false,
});

const Timeline = dynamic(() => import("./timeline/Timeline"), {
  ssr: false,
});

const Kanban = dynamic(() => import("./kanban/Kanban"), {
  ssr: false,
});
const TypeItems = dynamic(() => import("./common/Type"), {
  ssr: false,
});
const EpicItems = dynamic(() => import("./common/Epic"), {
  ssr: false,
});
const GroupByItems = dynamic(() => import("./common/GroupBy"), {
  ssr: false,
});

const Backlog = dynamic(() => import("./backlog/Backlog"), {
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

function MyTeamContainer(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [activeButton, setActiveButton] = useState("Backlog");
  const [showModalForAll, setShowModalForAll] = useState(false);
  const [showBackLogModal, setShowBacklogModal] = useState(false);
  const [showAddPeople,setShowAddPeople] = useState(false)

  const handleAddPeople = () => {
    if(showAddPeople === true) {
      setShowAddPeople(false)
    } else if(showAddPeople === false)
    setShowAddPeople(true)
  }


  const dispatch = useDispatch();
  const localFilter = useSelector((state) => state.localFilter);


  const handleSubmitFilter = () => {
    dispatch(getAdvanceFilter({ advanceFilterClick: true }));
    dispatch(getlocalFilter({ ownerIds: [], epics: [], types: [], sort: "" }));
  }


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


  const [activeOwner, setActiveOwner] = useState(null);
  const handleAvatarClick = (alt) => {
    setActiveOwner(alt);
  };
  const [clearAll, setClearAll] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  const handleClearAll = () => {
    dispatch(getAdvanceFilter({ beforedate: "", afterdate: "", ownerIds: [], status: "", jobtype: "" }));
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

  const handleClearLocalFilter = () => {
    dispatch(getlocalFilter({ ownerIds: [], epics: [], types: [], sort: "" }));
  }

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
        {
          activeButton === "Timeline" ? <MilestoneContainer/>:
            <CreateNewButton
              showModalForAll={showModalForAll}
              handleShowModalForAll={handleShowModalForAll}
              showBackLogModal={showBackLogModal}
              handleShowBacklogModalForAll={handleShowBacklogModalForAll}
            />
        }

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
            className={`cus-button ${selectedButtons.includes(0) ? "selected" : ""
              } avatar-pink`}
            onClick={() => toggleSelected(0)}
          >
            AR
          </button>
          <button
            className={`cus-button ${selectedButtons.includes(1) ? "selected" : ""
              } avatar-blue`}
            onClick={() => toggleSelected(1)}
          >
            BH
          </button>
          <button
            className={`cus-button ${selectedButtons.includes(2) ? "selected" : ""
              } avatar-pink`}
            onClick={() => toggleSelected(2)}
          >
            SS
          </button>
          <button
            className={`cus-button ${selectedButtons.includes(3) ? "selected" : ""
              } avatar-blue`}
            onClick={() => toggleSelected(3)}
          >
            GT
          </button>
          <button
            className={`cus-button cus-button-toggle ${selectedButtons.includes(4) ? "selected" : ""
              } avatar-plus`}
          >
            +4
          </button>
        </div>
        {activeButton === "Backlog" ? (
          <div className="d-flex justify-content-between">
            <AssigneeFilter />
            <EpicItems />
            <TypeItems />
            <SortFilter />
            <p onClick={handleClearLocalFilter} className="gray-color padding-03 its-pointer">Clear All</p>
          </div>
        ) : activeButton === "Kanban" ? (
          <div className="d-flex justify-content-between">
            <GroupByItems />
            <EpicItems />
            <TypeItems />
            <p onClick={handleClearLocalFilter} className="gray-color padding-03 its-pointer">Clear All</p>
          </div>
        ) : (
          <div className="d-flex justify-content-between">
            <StatusCategory />
            <EpicItems />
            <TypeItems />
            <p onClick={handleClearLocalFilter} className="gray-color padding-03 its-pointer">Clear All</p>
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
        <div className="filter-modal-title">
          <p className="fw-bolder">Filter</p>
          <p className="fw-bolder its-pointer" onClick={() => handleClearAll()}>
            Clear All
          </p>
        </div>
        <Modal.Body>
          <Filter
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleCloseFilter}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSubmitFilter}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyTeamContainer;
