import React, { useState, useEffect } from 'react';
import Axiosinstance from './Axiosinstance';
import { Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';

const DevelopersAndTeamLeads = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axiosinstance.get('get_developers_and_team_leads/');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleRemove = async (userId) => {
    try {
      await Axiosinstance.delete(`delete_user/${userId}/`);
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
      setMessage('User removed successfully.');
    } catch (err) {
      setError('Failed to remove user.');
      console.error(err);
    }
  };

  return (
    <Container fluid className="p-3">
      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          {message && <Alert variant="success" className="text-center">{message}</Alert>}
          <h2 className="my-4 text-center">Developers and Team Leads</h2>
          <Table striped bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.is_team_lead ? 'Team Lead' : ''}
                    {user.is_team_lead && user.is_developer ? ', ' : ''}
                    {user.is_developer ? 'Developer' : ''}
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemove(user.id)}>Remove</Button>
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

export default DevelopersAndTeamLeads;
