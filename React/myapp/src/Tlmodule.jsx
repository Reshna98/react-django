import React, { useState, useEffect } from 'react';
import Axiosinstance from './Axiosinstance'; // Adjust the path as per your project structure
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const Tlmodule = () => {
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState('');
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const response = await Axiosinstance.get('get_assignments/');
            setAssignments(response.data); // Assuming response.data is already properly serialized
        } catch (error) {
            console.error('Failed to fetch assignments:', error);
            setError('Failed to fetch assignments. Please try again later.');
        }
    };

    const handleCreateModule = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await Axiosinstance.post('create_module/', {
                assignment_id: selectedAssignment,
                name: moduleName,
                description: moduleDescription
            });
            alert('Module created successfully.');
            setModuleName('');
            setModuleDescription('');
        } catch (error) {
            console.error('Error creating module:', error);
            alert('Error creating module. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="p-3">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <div className="form-container">
                        <h2 className="text-center mb-4">Create Module</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleCreateModule}>
                            <Form.Group controlId="assignmentDropdown">
                                <Form.Label>Select Assignment</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedAssignment}
                                    onChange={(e) => setSelectedAssignment(e.target.value)}
                                    required
                                >
                                    <option value="">Select Assignment</option>
                                    {assignments.map((assignment) => (
                                        <option key={assignment.id} value={assignment.id}>
                                            {assignment.project_name} - {assignment.start_date} to {assignment.end_date}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="moduleName">
                                <Form.Label>Module Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={moduleName}
                                    onChange={(e) => setModuleName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="moduleDescription">
                                <Form.Label>Module Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={moduleDescription}
                                    onChange={(e) => setModuleDescription(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className=" mt-4" disabled={loading}>
                                {loading ? 'Creating Module...' : 'Create Module'}
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Tlmodule;
