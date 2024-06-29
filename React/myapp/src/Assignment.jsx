import React, { useState, useEffect } from 'react';
import Axiosinstance from './Axiosinstance';
import { Alert, Container, Row, Col, Form, Button } from 'react-bootstrap';

const Assignment = () => {
  const [projects, setProjects] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTeamLead, setSelectedTeamLead] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await Axiosinstance.get('get_projects/');
        const teamLeadsResponse = await Axiosinstance.get('get_team_leads/');
        setProjects(projectsResponse.data);
        setTeamLeads(teamLeadsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await Axiosinstance.post('assign_project/', {
        project: parseInt(selectedProject),
        team_lead: parseInt(selectedTeamLead),
        start_date: startDate,
        end_date: endDate,
      });
      setMessage('Project assigned successfully!');
    } catch (error) {
      console.error('Error assigning project:', error);
      if (error.response) {
        if (error.response.status === 400) {
          setError('Bad Request: Invalid data format.');
          console.log('Error details:', error.response.data);
        } else if (error.response.status === 401) {
          setError('Unauthorized: Token expired or invalid.');
        } else {
          setError('Error assigning project.');
        }
      } else if (error.request) {
        setError('Network error: Could not communicate with the server.');
      } else {
        setError('Unexpected error occurred.');
      }
    }
  };

  return (
    <Container fluid className="p-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          {message && <Alert variant="success" className="text-center">{message}</Alert>}
          <h2 className="my-4 text-center">Assign Project</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="project">
              <Form.Label>Project</Form.Label>
              <Form.Control
                as="select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                required
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.project_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="teamLead" className="mt-3">
              <Form.Label>Team Lead</Form.Label>
              <Form.Control
                as="select"
                value={selectedTeamLead}
                onChange={(e) => setSelectedTeamLead(e.target.value)}
                required
              >
                <option value="">Select a team lead</option>
                {teamLeads.map((teamLead) => (
                  <option key={teamLead.id} value={teamLead.id}>
                    {teamLead.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="startDate" className="mt-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="endDate" className="mt-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-3" disabled={!selectedProject || !selectedTeamLead || !startDate || !endDate}>
              Assign Project
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Assignment;
