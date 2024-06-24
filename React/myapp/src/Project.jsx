import React, { useState } from 'react';
import axios from 'axios';

const Project = () => {
  const [project, setProject] = useState({
    client_name: '',
    project_name: '',
    description: '',
    requirements: '',
    start_date: '',
    end_date: '',
    attachments: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProject((prevProject) => ({
      ...prevProject,
      attachments: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in project) {
      formData.append(key, project[key]);
    }

    // Retrieve the token from local storage
    const token = localStorage.getItem('authToken');
    console.log(token);

    try {
      const response = await axios.post('http://localhost:8000/Project_assign', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the token in the headers
        },
      });
      console.log(response.data);
      alert('Project added successfully!');
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 401) {
          alert('Unauthorized: Token expired or invalid.');
          // Handle token refresh or re-login if needed
        } else {
          alert(`Error: ${error.response.data.detail}`);
        }
      } else {
        alert('An error occurred while adding the project.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6">
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label htmlFor="client_name">Client Name:</label>
            <input
              type="text"
              className="form-control"
              id="client_name"
              name="client_name"
              value={project.client_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="project_name">Project Name:</label>
            <input
              type="text"
              className="form-control"
              id="project_name"
              name="project_name"
              value={project.project_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={project.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="requirements">Requirements:</label>
            <textarea
              className="form-control"
              id="requirements"
              name="requirements"
              value={project.requirements}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="start_date">Start Date:</label>
            <input
              type="date"
              className="form-control"
              id="start_date"
              name="start_date"
              value={project.start_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">End Date:</label>
            <input
              type="date"
              className="form-control"
              id="end_date"
              name="end_date"
              value={project.end_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="attachments">Attachments:</label>
            <input
              type="file"
              className="form-control-file"
              id="attachments"
              name="attachments"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Add Project</button>
        </form>
      </div>
    </div>
  );
};

export default Project;
