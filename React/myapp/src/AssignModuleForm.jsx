import React, { useState, useEffect } from 'react';
import Axiosinstance from './Axiosinstance'; // Adjust the path as per your project structure
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const TlModuleAssignment = () => {
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState('');
    const [developers, setDevelopers] = useState([]);
    const [selectedDeveloper, setSelectedDeveloper] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchModules();
        fetchDevelopers();
    }, []);

    const fetchModules = async () => {
        try {
            const response = await Axiosinstance.get('get_moduless/');
            setModules(response.data);
        } catch (error) {
            console.error('Failed to fetch modules:', error);
        }
    };

    const fetchDevelopers = async () => {
        try {
            const response = await Axiosinstance.get('get_developerss/');
            setDevelopers(response.data);
        } catch (error) {
            console.error('Failed to fetch developers:', error);
        }
    };

    const handleAssignModule = async (event) => {
        event.preventDefault();
        try {
            const response = await Axiosinstance.post('assign_module_to_developer/', {
                module_id: selectedModule,
                developer_id: selectedDeveloper,
                start_date: startDate,
                end_date: endDate
            });
            // Handle success, maybe show a success message or reset form
            alert('Module assigned to developer successfully.');
            setSelectedModule('');
            setSelectedDeveloper('');
            setStartDate('');
            setEndDate('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error assigning module:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('Failed to assign module. Please try again.');
            }
        }
    };

    return (
        <Container fluid className="p-3">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <h2 className="mb-4 text-center">Assign Module to Developer</h2>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <Form onSubmit={handleAssignModule}>
                        <Form.Group controlId="moduleDropdown">
                            <Form.Label>Select Module</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedModule}
                                onChange={(e) => setSelectedModule(e.target.value)}
                                required
                            >
                                <option value="">Select Module</option>
                                {modules.map((module) => (
                                    <option key={module.id} value={module.id}>
                                        {module.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="developerDropdown">
                            <Form.Label>Select Developer</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedDeveloper}
                                onChange={(e) => setSelectedDeveloper(e.target.value)}
                                required
                            >
                                <option value="">Select Developer</option>
                                {developers.map((developer) => (
                                    <option key={developer.id} value={developer.id}>
                                        {developer.username}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='mt-4'>
                            Assign Module
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default TlModuleAssignment;
