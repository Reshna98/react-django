import React, { useState } from 'react';
import Axiosinstance from './Axiosinstance'; // Adjust the import path based on your project structure

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setLoading(true);
    setError('');

    const formData = new FormData();
    for (const key in project) {
      if (key === 'attachments' && project.attachments === null) {
        continue; // Skip appending attachments if it's null
      }
      formData.append(key, project[key]);
    }

    try {
      const response = await Axiosinstance.post('Project_assign/', formData);
      console.log(response.data);
      alert('Project added successfully!');
      setProject({
        client_name: '',
        project_name: '',
        description: '',
        requirements: '',
        start_date: '',
        end_date: '',
        attachments: null,
      });
    } catch (error) {
      console.error('Add project error:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setError('Unauthorized: Token expired or invalid.');
          // Handle token refresh or re-login if needed
        } else {
          // Handle specific error messages if available
          const errorMessage = error.response.data && error.response.data.detail
            ? `Error: ${error.response.data.detail}`
            : 'Error: An error occurred while adding the project.';
          setError(errorMessage);
        }
      } else if (error.request) {
        setError('Network error: Could not communicate with the server.');
      } else {
        setError('Unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6">
      <h2 className="text-center mb-4">Add Projects</h2>
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
          <div className="form-group p-2">
            <label htmlFor="attachments">Attachments:</label>
            <input
              type="file"
              className="form-control-file"
              id="attachments"
              name="attachments"
              onChange={handleFileChange}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Adding Project...' : 'Add Project'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Project;
