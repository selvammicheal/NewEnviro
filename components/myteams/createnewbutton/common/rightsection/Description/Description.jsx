import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import CkEditor from "@/components/common/CkEditor/CkEditor";
import { MdAttachFile } from "react-icons/md";
import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import WorkImg from "../../../../../../public//images/work.png";
import { FiDownload } from "react-icons/fi";
import FileUploader from "@/components/common/FileUploader/FileUploader";
import { MdOutlineDelete } from "react-icons/md";

function Description(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState("Editable content");
  const [ckEditorData, setCkEditorData] = useState(
    "<p>Please write your Description wow!</p>"
  );
  const [childData, setChildData] = useState("");
  const [openUploader, setOpenUploader] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    setCkEditorData(childData);
  };

  const handleChildData = (data) => {
    setChildData(data);
    props.handleCkEditorData(data)
  };

  const handleAttach = () => {
    setOpenUploader(true);
  };

  const handleCloseUpload = (data) => {
    setOpenUploader(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="fw-bolder">Description</div>
        {isEditing ? (
          <div className="d-flex justify-content-between">
            <Button variant="outline-dark" size="sm" onClick={handleSave}>
              {" "}
              Cancel
            </Button>
            <Button
              variant="outline-dark"
              size="sm"
              onClick={handleSave}
              className="mrl"
            >
              Save
            </Button>
          </div>
        ) : (
          <Button variant="outline-dark" size="sm" onClick={handleEditToggle}>
            <FaRegEdit className="icon-react-cus"/>
          </Button>
        )}
      </div>
      <div className="editor-container">
        {isEditing ? (
          <div>
            <CkEditor
              ckEditorData={ckEditorData}
              sendDataToParent={handleChildData}
            />
          </div>
        ) : (
          <div className="pda">
            <div dangerouslySetInnerHTML={{ __html: ckEditorData }} />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-between mrt">
        <div className="fw-bolder">Attachments</div>
        <Button variant="outline-dark" size="sm" onClick={handleAttach}>
          <MdAttachFile className="icon-react-cus"/>
        </Button>
      </div>
      {/* <div className="mrl04">
        <Row>
          <Col sm={4} md={4} className="b-1-lg bdr03 pda03 mrr">
            <Image
              src={WorkImg}
              alt="enlarged"
              className="description-attatched-image"
            />
            <div>Figma1.png</div>
            <div className="d-flex justify-content-between">
              <p className="gray-color pdth font05">
                12 February 2024 at 14:28
              </p>
              <FiDownload />
            </div>
          </Col>
          <Col sm={4} md={4} className="mrr pda03 bdr03 b-1-lg">
            <Image
              src={WorkImg}
              alt="enlarged"
              className="description-attatched-image"
            />
            <div>Figma1.png</div>
            <div className="d-flex justify-content-between">
              <p className="gray-color font05 pdth">
                12 February 2024 at 14:28
              </p>
              <FiDownload />
            </div>
          </Col>
        </Row>
      </div> */}
      <hr />
      {/* <div className="mrt">
        <div className="d-flex justify-content-between mrt">
          <div className="d-flex">
            <MdAttachFile className="gray-color icon-react-cus" />
            <div className="blue-color pdl">Figma1.png</div>
          </div>
          <MdOutlineDelete className="gray-color icon-react-cus" />
        </div>
        <div className="mrt d-flex justify-content-between">
          <div className="d-flex">
            <MdAttachFile className="gray-color icon-react-cus" />
            <div className="pdl blue-color">Figma1.png</div>
          </div>
          <MdOutlineDelete className="gray-color icon-react-cus" />
        </div>
      </div> */}
      {openUploader ? (
        <FileUploader handleCloseUpload={handleCloseUpload} />
      ) : null}
    </div>
  );
}

export default Description;
