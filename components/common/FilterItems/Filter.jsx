import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ByDate from "./ByDate";
import TypeComp from "./TypeComp";
import AssignedToComp from "./AssignedToComp";
import StatusComp from "./StatusComp";
import TaskComp from "./TaskComp";
import SubTaskComp from "./SubTaskComp";

function Filter() {
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
                Type
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third" className="custom-tab-link">
                Assigned To
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth" className="custom-tab-link">
                Status
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content className="tab-content-panel">
            <Tab.Pane eventKey="first">
              <ByDate
              />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <TypeComp
              />
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <AssignedToComp 
              />
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
              <StatusComp 
              />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default Filter;
