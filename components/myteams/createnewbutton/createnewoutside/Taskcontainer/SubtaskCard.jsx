import React from "react";
import { Row, Col } from "react-bootstrap";
import { MdClearAll } from "react-icons/md";

function SubtaskCard({ name }) {
  return (
    <div className="mrbh mrth ph bdr03 b-05-lg">
      <Row>
        <Col sm={1} md={1}>
          <MdClearAll className="clear-all-icon" />
        </Col>
        <Col sm={2} md={2}>
          <p className="fw-bolder pdth font07">{name}</p>
        </Col>
        <Col sm={4} md={4}>
          <p className="subtask-card-description font07 pdth gray-color">
            Description dont makes any sense
          </p>
        </Col>
        <Col sm={1} md={1}>
          <p className="subtask-card-assignee">NR</p>
        </Col>
        <Col sm={2} md={2}>
          <p className="subtask-card-priority">Medium</p>
        </Col>
        <Col sm={2} md={2}>
          <p className="subtask-card-status">To Do</p>
        </Col>
      </Row>
    </div>
  );
}

export default SubtaskCard;
