import React from "react";
import { Col, Row } from "react-bootstrap";
import { MdOutlinePushPin } from "react-icons/md";
import { MdOutlineMoreVert } from "react-icons/md";
import Image from "next/image";
import WorkImg from "../../../../../../public/images/work.png";

function FileBox(props) {
  return (
    <div className="pdb pdt bb-1-lg">
      <Row>
        <Col sm={1} md={1}>
          <p className={`filebox-avatar`} style={{ backgroundColor: props.bg }}>
            {props.icon}
          </p>
        </Col>
        <Col sm={4} md={4}>
          <p className="filebox-name">{props.name}</p>
        </Col>
        <Col sm={5} md={5} className="filebox-text-container">
          <p className="filebox-text">12 Feb 2024 at 12:43 AM</p>
        </Col>
        <Col sm={1} md={1}>
          <MdOutlinePushPin className="icon-react-cus"/>
        </Col>
        <Col sm={1} md={1}>
          <MdOutlineMoreVert className="icon-react-cus"/>
        </Col>
      </Row>
      <p className="pdbh pdth">{props.desc}</p>
      {props.image ? (
        <Image src={WorkImg} alt="enlarged" className="filebox-image" />
      ) : null}
    </div>
  );
}

export default FileBox;
