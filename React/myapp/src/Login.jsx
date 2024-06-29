
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import "./hoMe.css";
import Navbar1 from "./Navbar1";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        username: inputUsername,
        password: inputPassword,
      });

      const data = response.data;

      if (response.status === 200) {
        const role = data.role;
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);

        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "team_lead") {
          navigate("/tl-dashboard");
        } else {
          navigate("/developer-dashboard");
        }
      } else {
        setErrorMessage(response.data.message || "Unknown error occurred");
        setShow(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.response?.data?.message || "Unknown error occurred");
      setShow(true);
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
          <div className="h4 mb-2 text-center">Sign In</div>
          {show && (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              {errorMessage}
            </Alert>
          )}
          <Form.Group className="mb-2" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={inputUsername}
              placeholder="Username"
              onChange={(e) => setInputUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={inputPassword}
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </Form.Group>
          {!loading ? (
            <Button className="w-100" variant="primary" type="submit">
              Log In
            </Button> 
          ) : (
            <Button
              className="w-100"
              variant="primary"
              type="submit"
              disabled
            >
              Logging In...
            </Button>
          )}
        </Form>
        <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center"></div>
      </div>
    </>
  );
};

export default Login; 

