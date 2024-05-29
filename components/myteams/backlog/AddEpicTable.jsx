import { createEpic } from '@/services/MyTeam';
import React, { useState } from 'react';
import { Form, Table } from 'react-bootstrap';

function AddEpicTable(props) {
    const [epicName, setEpicName] = useState()
    const PROJECT_ID = (localStorage.getItem("projectId"))

    const handleInputChange = (e) => {
        setEpicName(e.target.value);
    };


    const handleAddEpic = async () => {
        const data = {
            "title": epicName,
            "project_id": PROJECT_ID
        }
        try {
            const response = await createEpic(data);
            if (response.status === true) {
                props.EpicAddedHandler(false)
            }
            else if (response.status === false) {
            }

        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleBlur = () => {
        if (epicName) {
            handleAddEpic()
        }

    }


    return (
        <div className="table-responsive ">
            <Table bordered>
                <thead>
                    <tr>
                        <th>
                            <Form>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Enter the epic name"
                                    className="new-epic-input"
                                    value={epicName}
                                    onChange={(e) => handleInputChange(e)}
                                    onBlur={(e) => handleBlur(e)}
                                />
                            </Form>
                        </th>
                    </tr>
                </thead>
            </Table>
        </div>
    );
}

export default AddEpicTable;