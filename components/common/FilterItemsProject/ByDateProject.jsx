import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { IoIosArrowRoundForward } from "react-icons/io";

import { Row, Col } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import { GrClose } from "react-icons/gr";

function ByDateProject({ clearAll, handleStartDate, startDates }) {
  const [startDate, setStartDate] = useState(startDates);
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    handleStartDate(event.target.value);
  };
  const handleClearDates = () => {
    setStartDate("");
    handleStartDate(false);
  };
  useEffect(() => {
    setStartDate("");
  }, [clearAll]);

  useEffect(() => {
    setStartDate(startDates);
  }, [startDates]);

  return (
    <>
      <div>
        <p className="pdbh gray-color">Start Date</p>
        <Row>
          <Col sm={4} md={4}>
            <Form.Group className="mb-2">
              <Form.Control
                type="date"
                className="gray-color"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Form.Group>
          </Col>
          {startDate ? (
            <Col
              sm={1}
              md={1}
              onClick={handleClearDates}
              className="its-pointer"
            >
              <GrClose />
            </Col>
          ) : null}
        </Row>
      </div>
    </>
  );
}

export default ByDateProject;
