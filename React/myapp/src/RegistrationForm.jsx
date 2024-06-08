import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import "./Home.css";
import Navbar1 from "./Navbar1";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    course_completed: "",
    certification: null,
    department: "",
    is_developer: false,
    is_team_lead: false,
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });
      const response = await axios.post('http://127.0.0.1:8000/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
    } catch (error) {
      console.error(error.response.data);
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar1 />
      <div className="sign-in__wrapper">
        <div className="sign-in__backdrop"></div>
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <img
            className="img-thumbnail mx-auto d-block mb-2"
            src="/home.jpg"
            alt="logo"
          />
          <div className="h4 mb-2 text-center">Register</div>
          {showSuccessAlert && (
            <Alert
              className="mb-2"
              variant="success"
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              Registration successful.
            </Alert>
          )}
          {showErrorAlert && (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => setShowErrorAlert(false)}
              dismissible
            >
              Registration failed. Please try again.
            </Alert>
          )}
          <Form.Group className="mb-2" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={formData.username}
              placeholder="Username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              placeholder="Address"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="course_completed">
            <Form.Label>Course Completed</Form.Label>
            <Form.Control
              type="text"
              value={formData.course_completed}
              placeholder="Course Completed"
              onChange={(e) =>
                setFormData({ ...formData, course_completed: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="certification">
            <Form.Label>Certification</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, certification: e.target.files[0] })
              }
              accept=".pdf,.doc,.docx"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              required
            >
              <option value="">Select Department</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Python">Python</option>
              <option value="Data Science">Data Science</option>
              <option value="React">React</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-2" controlId="is_developer">
            <Form.Check
              type="checkbox"
              label="Developer"
              checked={formData.is_developer}
              onChange={(e) =>
                setFormData({ ...formData, is_developer: e.target.checked })
              }
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="is_team_lead">
            <Form.Check
              type="checkbox"
              label="Team Lead"
              checked={formData.is_team_lead}
              onChange={(e) =>
                setFormData({ ...formData, is_team_lead: e.target.checked })
              }
            />
          </Form.Group>
          {!loading ? (
            <Button className="w-100" variant="primary" type="submit">
              Register
            </Button>
          ) : (
            <Button className="w-100" variant="primary" type="submit" disabled>
              Registering...
            </Button>
          )}
        </Form>
      </div>
    </>
  );
};

export default RegistrationForm;
