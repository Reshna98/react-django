import React, { useEffect, useState } from 'react';
import Axiosinstance from './Axiosinstance';
import { Table, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const NotificationTable = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await Axiosinstance.get('pending-registrations/');
        setPendingUsers(response.data);
      } catch (err) {
        // setError('Failed to fetch pending registrations.');
        console.error(err);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await Axiosinstance.post(`approve-registration/${userId}/`);
      setPendingUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
      setMessage('User approved successfully.');
    } catch (err) {
      setError('Failed to approve registration.');
      console.error(err);
    }
  };

  const handleDecline = async (userId) => {
    try {
      await Axiosinstance.post(`/decline-registration/${userId}/`);
      setPendingUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
      setMessage('User declined successfully.');
    } catch (err) {
      setError('Failed to decline registration.');
      console.error(err);
    }
  };

  return (
    <Container fluid className="p-3">
    
      <Row className="justify-content-center">
        <Col xs={12} md={10}>
        {error && <Alert variant="danger" className="text-center w-45">{error}</Alert>}
        {message && <Alert variant="success" className="text-center w-45">{message}</Alert>}
          <h2 className="my-4 text-center">Pending User Registrations</h2>
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
              {pendingUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.department}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.is_team_lead ? 'Team Lead' : ''}
                    {user.is_team_lead && user.is_developer ? ', ' : ''}
                    {user.is_developer ? 'Developer' : ''}
                  </td>
                  <td>
                    <Button variant="success" className="me-2 mb-2 mb-md-0" onClick={() => handleApprove(user.id)}>Approve</Button>
                    <Button variant="danger" className="mb-2 mb-md-0" onClick={() => handleDecline(user.id)}>Decline</Button>
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

export default NotificationTable;
