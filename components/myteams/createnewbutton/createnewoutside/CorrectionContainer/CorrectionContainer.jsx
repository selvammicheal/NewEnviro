import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import RightSection from "../../common/rightsection/Rightsection";
import CreateCorrection from "./CreateCorrection";

function CorrectionContainer(props) {
  const [ckEditor,setCkEditor] = useState()
  const Project_id = (localStorage.getItem("projectId"))

  const ckeditorData = (data) =>{
    setCkEditor(data)
  }


  const handleFormData = (data) => {
    const SubmitData = {
      "job_type": props.selectedItem,
      "epic_id": data.epic,
      "task_id": data.milestone,
      "assignee_id": data.assignee,
      "project_id": Project_id,
      "title": data.title,
      "summary": data.summary,
      "status": data.status,
      "due_date": data.dueDate,
      "priority": data.priority,
      "timeline": data.timeline,
      "description": ckEditor,
      "attachments": [localStorage.getItem("uploadId")]
    }
     props.handleSubmitJob(SubmitData)
  }

  return (
    <div>
      <Row>
        <Col sm={6} md={6} className="tab-side-container">
          <CreateCorrection selectedItem={props.selectedItem} handleFormData={handleFormData}/>
        </Col>
        <Col sm={6} md={6}>
          <RightSection ckeditorData={ckeditorData}/>
        </Col>
      </Row>
    </div>
  );
}

export default CorrectionContainer;
