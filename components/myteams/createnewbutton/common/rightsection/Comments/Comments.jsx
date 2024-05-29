"use client";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { MdAttachFile } from "react-icons/md";
import CommentBox from "./CommentBox";
import FileUploader from "@/components/common/FileUploader/FileUploader";

function Comments(props) {
  const [openUploader, setOpenUploader] = useState(false);
  const handleCloseUpload = (data) => {
    setOpenUploader(false);
  };
  const handleAttach = () => {
    setOpenUploader(true);
  };
  return (
    <div>
      <Row>
        <Col sm={8} md={8}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Please write your comments"
            />
          </Form.Group>
        </Col>
        <Col sm={2} md={2}>
          <div className="d-flex gap02">
            <Button variant="outline-dark" size="md" className="b-05-lg font09">
              Post
            </Button>

            <Button
              variant="outline-dark"
              size="sm"
              className="b-1-lg"
              onClick={handleAttach}
            >
              <MdAttachFile className="icon-react-cus"/>
            </Button>
          </div>
        </Col>
      </Row>
      <div className="mrt mrb">
        <CommentBox
          image={true}
          name="Arun Kumar"
          desc="That's Good! Need to add more modules in the upcoming days"
          icon="AR"
          bg={"#A7C8F0"}
        />
        <CommentBox
          image={false}
          name="Bhashit Bhardwaj"
          desc="That's Good! Need to add more modules in the upcoming days"
          icon="BB"
          bg={"#F0A7A7"}
        />
        <CommentBox
          image={true}
          name="Ram Singh"
          desc="That's Good! Need to add more modules in the upcoming days"
          icon="RS"
          bg={"#F0A7A7"}
        />
        <CommentBox
          image={false}
          name="Mike Deo"
          desc="That's Good! Need to add more modules in the upcoming days"
          icon="MD"
          bg={"#A7C8F0"}
        />
      </div>
      {openUploader ? (
        <FileUploader handleCloseUpload={handleCloseUpload} />
      ) : null}
    </div>
  );
}

export default Comments;
