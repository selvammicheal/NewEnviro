import React, { useState } from 'react';
import EmptyRow from './EmptyRow';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Form } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import { SlArrowDown } from "react-icons/sl";

function AddNewJob(props) {
    const [assignee, setAssignee] = useState("Create New");
    const [showEmptyTable, setShowEmptyTable] = useState(false)

    const handleChangeAssigne = (event) => {
        setAssignee(event.target.value);
        if (event.target.value === "Task" || event.target.value === "Feedback" || event.target.value === "Correction") {
            setShowEmptyTable(true)
        }
    };

    const handleCloseTable = (data) =>{
        setShowEmptyTable(data)
        setAssignee("Create New")
        props.jobAddedHandler()
    }

    return (
        <>
            {
                showEmptyTable && <EmptyRow handleCloseTable={handleCloseTable} EpicId={props.EpicId} assignee={assignee} jobAddedHandler={props.jobAddedHandler}/>
            }

            <div className='create-new-epic-button'>
                <Form.Group className="mb-2">
                    <FormControl sx={{ width: "100%" }}>
                        <Select
                            value={assignee}
                            onChange={handleChangeAssigne}
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{ maxHeight: "2.5rem" }}
                            className='add-job-dropdown'
                            IconComponent={SlArrowDown}
                        >
                            <MenuItem disabled value={"Create New"}>
                                Create New
                            </MenuItem>
                            <MenuItem value={"Task"}>Task</MenuItem>
                            <MenuItem value={"Feedback"}>Feedback</MenuItem>
                            <MenuItem value={"Correction"}>Correction</MenuItem>
                        </Select>
                    </FormControl>
                </Form.Group>
            </div>
        </>

    );
}

export default AddNewJob;