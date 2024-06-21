import React, { useState } from 'react';
import axios from 'axios';
import styles from './proJect.module.css'; // Import the specific styles for the Project component

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
    try {
      const response = await axios.post('http://localhost:8000/Project_assign', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Project added successfully!');
      // Clear form fields after successful submission
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
      console.error(error);
      alert('An error occurred while adding the project.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.projectForm}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Client Name:</label>
        <input type="text" name="client_name" value={project.client_name} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Project Name:</label>
        <input type="text" name="project_name" value={project.project_name} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Description:</label>
        <textarea name="description" value={project.description} onChange={handleChange} required></textarea>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Requirements:</label>
        <textarea name="requirements" value={project.requirements} onChange={handleChange} required></textarea>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Start Date:</label>
        <input type="date" name="start_date" value={project.start_date} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>End Date:</label>
        <input type="date" name="end_date" value={project.end_date} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Attachments:</label>
        <input type="file" name="attachments" onChange={handleFileChange} />
      </div>
      <button type="submit" className={styles.submitBtn}>Add Project</button>
    </form>
  );
};

export default Project;
