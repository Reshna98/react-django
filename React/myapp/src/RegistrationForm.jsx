import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    course_completed: '',
    certification: null,
    department: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      certification: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', formData);
      console.log(response.data);
      // Handle successful registration, e.g., show a success message to the user
    } catch (error) {
      console.error(error);
      // Handle registration error, e.g., display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      <input type="text" name="course_completed" value={formData.course_completed} onChange={handleChange} placeholder="Course Completed" required />
      <input type="file" name="certification" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      {/* Add dropdown/select input for department selection */}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
