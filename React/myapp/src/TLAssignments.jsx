import React, { useEffect, useState } from 'react';
import Axiosinstance from './Axiosinstance'; // Adjust the path as per your project structure
import { Table, Button, Alert, Container, Row, Col, Modal } from 'react-bootstrap';
import fileDownload from 'js-file-download'; // Import js-file-download library

const TLAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const response = await Axiosinstance.get('get_tl_assignments/');
            console.log(response.data); // Log assignments to check data
            setAssignments(response.data);
        } catch (err) {
            setError('Failed to fetch assignments.');
            console.error(err);
        }
    };

    const handleViewDetails = async (projectId) => {
        try {
            console.log('Fetching project details for projectId:', projectId); // Log the projectId here
            const response = await Axiosinstance.get(`project_details/${projectId}/`);
            console.log(response.data); // Log response data
            setSelectedProject(response.data);
            setShowModal(true);
        } catch (err) {
            setError('Failed to fetch project details.');
            console.error('Error fetching project details:', err);
        }
    };

    const downloadAttachment = async (projectId, filename) => {
        try {
            const response = await Axiosinstance.get(`serve_project_attachment/${projectId}/`, {
                responseType: 'blob', // Ensure response is treated as binary data
            });

            fileDownload(response.data, filename); // Trigger file download using js-file-download

        } catch (err) {
            console.error('Error downloading attachment:', err);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProject(null);
    };

    return (
        <Container fluid className="p-3">
            <Row className="justify-content-center">
                <Col xs={12} md={10}>
                    {error && <Alert variant="danger" className="text-center w-45">{error}</Alert>}
                    <h2 className="my-4 text-center">Assigned Projects</h2>
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Assigned To</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment, index) => (
                                <tr key={index}>
                                    <td>{assignment.project_name}</td>
                                    <td>{assignment.tl_name}</td>
                                    <td>{assignment.start_date}</td>
                                    <td>{assignment.end_date}</td>
                                    <td>
                                        <Button variant="primary" className="me-2 mb-2 mb-md-0" onClick={() => handleViewDetails(assignment.project_id)}>View Details</Button>
                                        {assignment.attachments && (
                                            <Button variant="secondary" onClick={() => downloadAttachment(assignment.project_id, assignment.attachments)}>Download Attachment</Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Modal for Project Details */}
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProject && (
                        <div>
                            <p><strong>Project Name:</strong> {selectedProject.project_name}</p>
                            <p><strong>Description:</strong> {selectedProject.description}</p>
                            <p><strong>Requirements:</strong> {selectedProject.requirements}</p>
                            <p><strong>Start Date:</strong> {selectedProject.start_date}</p>
                            <p><strong>End Date:</strong> {selectedProject.end_date}</p>
                            {selectedProject.attachments && (
                                <div>
                                    <p><strong>Attachments:</strong></p>
                                    <Button variant="secondary" onClick={() => downloadAttachment(selectedProject.id, selectedProject.attachments)}>Download Attachment</Button>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default TLAssignments;
