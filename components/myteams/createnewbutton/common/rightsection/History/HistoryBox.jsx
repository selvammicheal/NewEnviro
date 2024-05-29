import React from "react";
import { Col, Row } from "react-bootstrap";
import WorkImg from "../../../../../../public/images/work.png";

function HistoryBox(props) {
  return (
    <div className="historybox-parent">
      <Row>
        <Col sm={1} md={1}>
          <p
            className={`historybox-icon`}
            style={{ backgroundColor: props.bg }}
          >
            {props.icon}
          </p>
        </Col>
        <Col sm={4} md={4}>
          <p className="historybox-name">{props.name}</p>
        </Col>
        <Col sm={3} md={3} className="align-items-start">
          <p className="historybox-task">{props.task}</p>
        </Col>
        <Col sm={4} md={4} className="align-items-start">
          <p className="historybox-time">{props.time}</p>
        </Col>
      </Row>
      <p className="pdth pdbh">{props.desc}</p>
      {props.image ? (
        <Image src={WorkImg} alt="enlarged" className="historybox-image" />
      ) : null}
    </div>
  );
}

export default HistoryBox;
