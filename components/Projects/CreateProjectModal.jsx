import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import { Box, Grid } from "@mui/material";
import { Card, Row, Col } from "react-bootstrap";
import CkEditorTwo from "../common/CkEditor/CkEditorTwo";
import { createProject } from '@/services/AllProject';


function CreateProjectModal(props) {
    const [show, setShow] = useState(props.show);
    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState([])

    const handleClose = () => {
        setShow(false)
        props.createModelClose(true)
        props.handleCreateSuccess(false)
    };

    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        startDate: '',
        endDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [ckEditorData, setCkEditorData] = useState(
        "<p>Please write your Description wow!</p>"
    );
    const [childData, setChildData] = useState("");

    const handleChildData = (data) => {
        setChildData(data);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            "name": formData.name,
            "type": formData.type,
            "description": childData,
            "start_date": formData.startDate,
            "end_date": formData.endDate
        }

        try {
            const response = await createProject(data);
            if (response.status === true) {
                setShow(false)
                props.createModelClose(true)
                props.handleCreateSuccess(true)
                setFormData({
                    name: '',
                    type: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                });
            }
            else if (response.status === false) {
                setErrors(response.errors)
            }

        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Card className="project-card">
                                    <Card.Body>
                                        <Row>
                                            <Col sm={6} md={6}>
                                                <Form.Group className="mb-2">
                                                    <Form.Label>
                                                        Name <span className="text-red">*</span>
                                                    </Form.Label>
                                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={6} md={6}>
                                                <Form.Group className="mb-2">
                                                    <Form.Label>
                                                        Type <span className="text-red">*</span>
                                                    </Form.Label>
                                                    <Form.Control type="text" name="type" value={formData.type} onChange={handleInputChange} />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={6} md={6}>
                                                <Form.Group className="mb-2">
                                                    <Form.Label>
                                                        Start Date <span className="text-red">*</span>
                                                    </Form.Label>
                                                    <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="gray-color" />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={6} md={6}>
                                                <Form.Group className="mb-2">
                                                    <Form.Label>
                                                        End Date <span className="text-red">*</span>
                                                    </Form.Label>
                                                    <Form.Control type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="gray-color" />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={12}>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Description</Form.Label>
                                                    <CkEditorTwo
                                                        ckEditorData={ckEditorData}
                                                        sendDataToParent={handleChildData}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={12}>

                                               {
                                                errors.map((e)=>(
                                                    <li className='color-red'>{e}</li>
                                                ))
                                               }
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="dark" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateProjectModal;