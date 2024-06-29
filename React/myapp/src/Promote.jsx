import React, { useState, useEffect } from 'react';
import Axiosinstance from './Axiosinstance';
import { Table, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const Promote = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchApprovedUsers = async () => {
    try {
      const response = await Axiosinstance.get('/get_approved_users/');
      setUsers(response.data);
      setError(null); // Clear any previous errors on successful fetch
    } catch (err) {
      setError('Failed to fetch approved users. Please try again later.'); // Set a generic error message
      console.error('Error fetching approved users:', err); // Log the detailed error
    }
  };

  useEffect(() => {
    fetchApprovedUsers(); // Call fetchApprovedUsers within useEffect
  }, []);

  const promoteToTeamLead = async (userId) => {
    try {
      await Axiosinstance.post(`/promote_to_team_lead/${userId}/`);
      fetchApprovedUsers(); // Refresh user list after action
    } catch (error) {
      console.error('Failed to promote to Team Lead:', error);
    }
  };

  const demoteToDeveloper = async (userId) => {
    try {
      await Axiosinstance.post(`/demote_to_developer/${userId}/`);
      fetchApprovedUsers(); // Refresh user list after action
    } catch (error) {
      console.error('Failed to demote to Developer:', error);
    }
  };

  return (
    <Container fluid className="p-3">
      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          {error && <Alert variant="danger" className="text-center w-75">{error}</Alert>}
          <h2 className="my-4 text-center">Promote Users</h2>
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>Department</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.department}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.is_team_lead ? 'Team Lead' : 'Developer'}
                  </td>
                  <td>
                    {user.is_developer && (
                      <Button
                        variant="success"
                        className="me-2"
                        onClick={() => promoteToTeamLead(user.id)}
                      >
                        Promote to Team Lead
                      </Button>
                    )}
                    {user.is_team_lead && (
                      <Button
                        variant="warning"
                        onClick={() => demoteToDeveloper(user.id)}
                      >
                        Demote to Developer
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Promote;
