import { createJobByEpicId } from '@/services/MyTeam';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function EmptyRow(props) {
  const [jobName, setJobName] = useState()

  const handleInputChange = (e) => {
    setJobName(e.target.value);
  };

  // const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID
  const PROJECT_ID = (localStorage.getItem("projectId"))

  const handleAddJob = async () => {
    let data = null
    if (props.EpicId) {
      data = {
        "title": jobName,
        "epic_id": props.EpicId,
        "job_type": props.assignee,
        "project_id": PROJECT_ID

      }
    } else {
      data = {
        "title": jobName,
        "job_type": props.assignee,
        "project_id": PROJECT_ID
      }
    }

    try {
      const response = await createJobByEpicId(data);
      if (response.status === true) {
        props.handleCloseTable(false)
        props.jobAddedHandler(true)
      }
      else if (response.status === false) {
        console.log("Job has not been created")
      }

    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleBlur = () => {
    if (jobName) {
      handleAddJob()
    }

  }

  return (
    <tbody>
      <tr>
        <td>
          <Form>
            <input
              autoFocus
              type="text"
              placeholder="Enter the Job name"
              className="new-epic-input"
              value={jobName}
              onChange={(e) => handleInputChange(e)}
              onBlur={(e) => handleBlur(e)}
            />
          </Form>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  );
}

export default EmptyRow;