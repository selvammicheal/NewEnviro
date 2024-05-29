import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getAdvanceFilter } from "@/redux/action/myteam/advanceFilterAction";
// Update the path if necessary

function ByDate() {

  const dispatch = useDispatch();
  const advanceFilter = useSelector((state) => state.advanceFilter);
  console.log("advanceFilter..............", advanceFilter);


  const handleStartDateChange = (event) => {
    const value = event.target.value;
    dispatch(getAdvanceFilter({ afterdate: value }));
  };

  const handleEndDateChange = (event) => {
    const value = event.target.value;
    dispatch(getAdvanceFilter({ beforedate: value }));
  };

  const handleClearStartDate = () => {
    dispatch(getAdvanceFilter({ afterdate: "" }));
  };

  const handleClearEndDate = () => {
    dispatch(getAdvanceFilter({ beforedate: "" }));
  };


  return (
    <>
      <div>
        <p className="pdbh gray-color">After Date</p>
        <Row>
          <Col sm={4} md={4}>
            <Form.Group className="mb-2">
              <Form.Control
                type="date"
                className="gray-color"
                value={advanceFilter.afterdate}
                onChange={handleStartDateChange}
              />
            </Form.Group>
          </Col>
          {advanceFilter.afterdate ? (
            <Col
              sm={1}
              md={1}
              onClick={handleClearEndDate}
              className="its-pointer"
            >
              <GrClose />
            </Col>
          ) : null}
        </Row>
      </div>
      <div>
        <p className="pdbh gray-color">Before Date</p>
        <Row>
          <Col sm={4} md={4}>
            <Form.Group className="mb-2">
              <Form.Control
                type="date"
                className="gray-color"
                value={advanceFilter.beforedate}
                onChange={handleEndDateChange}
              />
            </Form.Group>
          </Col>
          {advanceFilter.beforedate ? (
            <Col
              sm={1}
              md={1}
              onClick={handleClearStartDate}
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

export default ByDate;
