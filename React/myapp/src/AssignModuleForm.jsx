import React, { useState, useEffect } from 'react';
import Axiosinstance from './Axiosinstance'; // Adjust the path as per your project structure
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AssignModuleForm = ({ tlId }) => {
    const [developers, setDevelopers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedDeveloper, setSelectedDeveloper] = useState('');
    const [selectedProject, setSelectedProject] = useState('');

    useEffect(() => {
        fetchDevelopers();
        fetchAssignedProjects();
    }, []);

    const fetchDevelopers = async () => {
        try {
            const response = await Axiosinstance.get('get_developers/');
            setDevelopers(response.data);
        } catch (error) {
            console.error('Failed to fetch developers:', error);
        }
    };

    const fetchAssignedProjects = async () => {
        try {
            const response = await Axiosinstance.get(`assigned_projects/${tlId}/`);
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch assigned projects:', error);
        }
    };

    const handleAssignModule = async (event) => {
        event.preventDefault();
        try {
            // Implement your assignment logic here, using Axiosinstance.post or similar
            console.log(`Assigning module to developer: ${selectedDeveloper} for project: ${selectedProject}`);
            // Example of how you might structure your POST request
            await Axiosinstance.post('assign_module/', {
                developer: selectedDeveloper,
                project: selectedProject,
            });
            // Handle success, maybe show a success message or reset form
        } catch (error) {
            console.error('Error assigning module:', error);
            // Handle error, show error message or alert
        }
    };

    return (
        <Container fluid className="p-3">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <Form onSubmit={handleAssignModule}>
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
                        <Form.Group controlId="projectDropdown">
                            <Form.Label>Select Project</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedProject}
                                onChange={(e) => setSelectedProject(e.target.value)}
                                required
                            >
                                <option value="">Select Project</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.project_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Assign
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AssignModuleForm;
