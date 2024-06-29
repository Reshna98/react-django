
import React, { useState } from 'react';
import Axiosinstance from './Axiosinstance'; // Adjust the import path based on your project structure

const AdminCreateUserForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        address: '',
        course_completed: '',
        certification: null,
        department: '',
        is_developer: false,
        is_team_lead: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: val });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, certification: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const formDataObj = new FormData();
            for (const key in formData) {
                if (formData[key]) {
                    formDataObj.append(key, formData[key]);
                }
            }
    
            const response = await Axiosinstance.post('admin_create_user/', formDataObj);
            console.log('User created successfully:', response.data);
            alert('User created successfully!');
            setFormData({
                username: '',
                email: '',
                address: '',
                course_completed: '',
                certification: null,
                department: '',
                is_developer: false,
                is_team_lead: false
            });
        } catch (error) {
            console.error('Failed to create user:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                console.error('Status code:', error.response.status);
    
                // Check for specific error messages and set error state accordingly
                if (error.response.data.username) {
                    setError(error.response.data.username[0]); // Displaying first error message for username
                } else if (error.response.data.email) {
                    setError(error.response.data.email[0]); // Displaying first error message for email
                } else {
                    setError('Failed to create user. Please check your input.');
                }
            } else if (error.request) {
                console.error('No response received:', error.request);
                setError('Failed to create user. No response received from the server.');
            } else {
                console.error('Error setting up the request:', error.message);
                setError('Failed to create user. An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-md-8 col-lg-6">
          
                <div className="form-container">
                    <h2 className="text-center mb-4">Create New User</h2>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <div className="form-group d-flex">
                                <div className="form-check mr-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="is_developer"
                                        name="is_developer"
                                        checked={formData.is_developer}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="is_developer">
                                        Is Developer
                                    </label>
                                </div>
                                <div className="form-check ml-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="is_team_lead"
                                        name="is_team_lead"
                                        checked={formData.is_team_lead}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="is_team_lead">
                                        Is Team Lead
                                    </label>
                                </div>
                            </div>
                        
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <textarea
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="course_completed">Course Completed:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="course_completed"
                                name="course_completed"
                                value={formData.course_completed}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="certification">Certification:</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="certification"
                                name="certification"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select
                                className="form-control"
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                            >
                                <option value="">Select Department</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Python">Python</option>
                                <option value="Data Science">Data Science</option>
                                <option value="React">React</option>
                            </select>
                        </div>
                        {/* <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="is_developer"
                                name="is_developer"
                                checked={formData.is_developer}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="is_developer">
                                Is Developer
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="is_team_lead"
                                name="is_team_lead"
                                checked={formData.is_team_lead}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="is_team_lead">
                                Is Team Lead
                            </label>
                        </div> */}
                        <button type="submit" className="btn btn-primary btn-block mt-3" disabled={loading}>
                            {loading ? 'Creating User...' : 'Create User'}
                        </button>
                      
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminCreateUserForm;
