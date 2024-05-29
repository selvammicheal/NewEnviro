import React from "react";
import { Col, Row, Dropdown } from "react-bootstrap";
import { MdOutlinePushPin } from "react-icons/md";
import { MdOutlineMoreVert } from "react-icons/md";
import Image from "next/image";
import WorkImg from "../../../../../../public/images/work.png";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

function CommentBox(props) {
  return (
    <div className="comment-parent">
      <Row>
        <Col sm={1} md={1}>
          <p className={`comment-icon`} style={{ backgroundColor: props.bg }}>
            {props.icon}
          </p>
        </Col>
        <Col sm={4} md={4}>
          <p className="comment-name">{props.name}</p>
        </Col>
        <Col sm={5} md={5}>
          <p className="comment-time">12 Feb 2024 at 12:43 AM</p>
        </Col>
        <Col sm={1} md={1}>
          <MdOutlinePushPin className="icon-react-cus" />
        </Col>
        <Col sm={1} md={1}>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="dropdown-toggle-button p0"
            >
              <PiDotsThreeVerticalBold className="ciicon-timeline" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Edit/Update</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Pin to top</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Move to feedback</Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Move to correction
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <p className="pdth pdbh">{props.desc}</p>
      {props.image ? (
        <Image src={WorkImg} alt="enlarged" className="comment-image" />
      ) : null}
    </div>
  );
}

export default CommentBox;
