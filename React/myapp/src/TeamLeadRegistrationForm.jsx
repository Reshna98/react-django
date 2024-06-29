// TeamLeadRegistrationForm.js
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import Navbar1 from "./Navbar1";
import { useNavigate } from 'react-router-dom';

const TeamLeadRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    course_completed: "",
    certification: null,
    department: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
      const response = await axios.post('http://127.0.0.1:8000/register_team_lead/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setTimeout(() => {
         navigate('/login');
      }, 2000);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
    } catch (error) {
      console.error(error.response.data);
      let errorMessage = "";
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data.username) {
        errorMessage = error.response.data.username;
      } else if (error.response.data.email) {
        errorMessage = error.response.data.email;
      }
      setErrorMessage(errorMessage);
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar1 />
      <div className="sign-in__wrapper1" style={{ overflow: "auto" }} >
        <div className="sign-in__backdrop"></div>
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <img
            className="img-thumbnail mx-auto d-block mb-2"
            src="/home.jpg"
            alt="logo"
          />
          <div className="h4 mb-2 text-center">Register as Team Lead</div>
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
              {errorMessage}
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
          {!loading ? (
            <Button className="w-100" variant="primary" type="submit" >
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

export default TeamLeadRegistrationForm;
