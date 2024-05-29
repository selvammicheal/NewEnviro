import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ByDateProject from "./ByDateProject";
import ByOwnerProject from "./ByOwnerProject";
import ByStatusProject from "./ByStatusProject";
import ByProject from "./ByProject";
import ByDependencyProject from "./ByDependencyProject";
import { useState } from "react";

function FilterItemsProject({
  clearAll,
  handleStartDateState,
  handleOwnerIdsState,
  handleStatusState,
  handleProjectIds,
  statusState,
  startDates,
  projectIds,
  ownerIds,
}) {
  const [startDate, setStartDate] = useState();
  const handleStartDate = (data) => {
    setStartDate(data);
    handleStartDateState(data);
  };
  const handleOwner = (data) => {
    handleOwnerIdsState(data);
  };
  const handleStatus = (data) => {
    handleStatusState(data);
  };
  const handleProject = (data) => {
    handleProjectIds(data);
  };


  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3} className="tab-side-container">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first" className="custom-tab-link">
                By Date
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second" className="custom-tab-link">
                By Owner
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third" className="custom-tab-link">
                Status
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth" className="custom-tab-link">
                By Project
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth" className="custom-tab-link">
                Dependency
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9} className="scrollable-panel">
          <Tab.Content className="pda">
            <Tab.Pane eventKey="first">
              <ByDateProject
                clearAll={clearAll}
                handleStartDate={handleStartDate}
                startDates={startDates}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <ByOwnerProject
                clearAll={clearAll}
                handleOwner={handleOwner}
                ownerIds={ownerIds}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <ByStatusProject
                clearAll={clearAll}
                handleStatus={handleStatus}
                statusState={statusState}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <ByProject
                clearAll={clearAll}
                handleProject={handleProject}
                projectIds={projectIds}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="fifth">
              <ByDependencyProject clearAll={clearAll} />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default FilterItemsProject;
