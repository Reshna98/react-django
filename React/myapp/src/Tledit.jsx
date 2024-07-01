// import React, { useState, useEffect } from 'react';
// import Axiosinstance from './Axiosinstance'; // Adjust the path as per your project structure
// import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const Tledit = () => {
//     const [profile, setProfile] = useState({
//         username: '',
//         email: '',
//         address: '',
//         course_completed: '',
//         certification: null,
//         department: ''
//     });
//     const [certificationName, setCertificationName] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//     const [showErrorAlert, setShowErrorAlert] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await Axiosinstance.get('tl_profile/');
//                 setProfile(response.data);
//                 // Set certificationName if certification already exists
//                 if (response.data.certification) {
//                     setCertificationName(response.data.certification.split('/').slice(-1)[0]);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch profile:', error);
//                 setError('Failed to fetch profile. Please try again.');
//             }
//         };

//         fetchProfile();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
    
//         if (name === 'certification' && files && files.length > 0) {
//             setCertificationName(files[0].name);
//             setProfile({
//                 ...profile,
//                 certification: files[0], // Update certification file
//             });
//         } else if (name === 'certification' && !files) {
//             // User did not select a new file, keep existing certification
//             setProfile({
//                 ...profile,
//                 certification: null, // Update certification to null to indicate no change
//             });
//         } else {
//             setProfile({
//                 ...profile,
//                 [name]: value, // Update other fields
//             });
//         }
//     };
    
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const formDataToSend = new FormData();
//             Object.keys(profile).forEach(key => {
//                 if (key === 'certification' && profile[key] === null) {
//                     // Do not append certification if it's null (no file selected)
//                 } else if (key === 'certification' && profile[key] instanceof File) {
//                     formDataToSend.append(key, profile[key]);
//                 } else if (profile[key] !== null && key !== 'certification') {
//                     formDataToSend.append(key, profile[key]);
//                 }
//             });
    
//             await Axiosinstance.put('update_profile/', formDataToSend, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             setShowSuccessAlert(true);
//             setShowErrorAlert(false);
//             setTimeout(() => {
//                 navigate('/profile');
//             }, 2000);
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             let errorMessage = 'Failed to update profile. Please try again.';
//             if (error.response && error.response.data) {
//                 if (error.response.data.username) {
//                     errorMessage = error.response.data.username[0]; // Handle username error
//                 } else if (error.response.data.email) {
//                     errorMessage = error.response.data.email[0]; // Handle email error
//                 } else if (error.response.data.certification) {
//                     errorMessage = error.response.data.certification[0]; // Handle certification error
//                 }
//             }
//             setErrorMessage(errorMessage);
//             setShowSuccessAlert(false);
//             setShowErrorAlert(true);
//         }
//         setLoading(false);
//     };

//     return (
//         <Container fluid className="p-3">
//             <Row className="justify-content-center">
//                 <Col xs={12} md={8}>
//                     <h2 className="mb-4 text-center">Edit Profile</h2>
//                     {showSuccessAlert && (
//                         <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
//                             Profile updated successfully.
//                         </Alert>
//                     )}
//                     {showErrorAlert && (
//                         <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
//                             {errorMessage}
//                         </Alert>
//                     )}
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="username">
//                             <Form.Label>Username</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="username"
//                                 value={profile.username}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="email">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 name="email"
//                                 value={profile.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="address">
//                             <Form.Label>Address</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="address"
//                                 value={profile.address}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="course_completed">
//                             <Form.Label>Course Completed</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="course_completed"
//                                 value={profile.course_completed}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="certification">
//                             <Form.Label>Certification</Form.Label>
//                             <Form.Control
//                                 type="file"
//                                 name="certification"
//                                 onChange={handleChange}
//                                 accept=".pdf,.doc,.docx"
//                             />
//                             {certificationName && !profile.certification && (
//                                 <div className="mt-2">
//                                     <small className="text-muted">Selected file: {certificationName}</small>
//                                 </div>
//                             )}
//                             {profile.certification && (
//                                 <div className="mt-2">
//                                     <small className="text-muted">Current file: {certificationName}</small>
//                                 </div>
//                             )}
//                         </Form.Group>
//                         <Form.Group controlId="department">
//                             <Form.Label>Department</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 name="department"
//                                 value={profile.department}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <option value="">Select Department</option>
//                                 <option value="Digital Marketing">Digital Marketing</option>
//                                 <option value="Python">Python</option>
//                                 <option value="Data Science">Data Science</option>
//                                 <option value="React">React</option>
//                             </Form.Control>
//                         </Form.Group>
//                         {!loading ? (
//                             <Button variant="primary" type="submit" className='mt-4'>
//                                 Update Profile
//                             </Button>
//                         ) : (
//                             <Button variant="primary" type="submit" disabled className='mt-4'>
//                                 Updating...
//                             </Button>
//                         )}
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Tledit;
import React, { useState, useEffect } from 'react';
import Axiosinstance from './Axiosinstance'; // Adjust the path as per your project structure
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Tledit = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        address: '',
        course_completed: '',
        certification: null,
        department: ''
    });
    const [certificationName, setCertificationName] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await Axiosinstance.get('tl_profile/');
                setProfile(response.data);
                // Set certificationName if certification already exists
                if (response.data.certification) {
                    setCertificationName(response.data.certification.split('/').slice(-1)[0]);
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setShowErrorAlert(true);
                setErrorMessage('Failed to fetch profile. Please try again.');
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'certification' && files && files.length > 0) {
            setCertificationName(files[0].name);
            setProfile({
                ...profile,
                certification: files[0], // Update certification file
            });
        } else if (name === 'certification' && !files) {
            // User did not select a new file, keep existing certification
            setProfile({
                ...profile,
                certification: null, // Update certification to null to indicate no change
            });
        } else {
            setProfile({
                ...profile,
                [name]: value, // Update other fields
            });
        }
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            Object.keys(profile).forEach(key => {
                if (key === 'certification' && profile[key] === null) {
                    // Do not append certification if it's null (no file selected)
                } else if (key === 'certification' && profile[key] instanceof File) {
                    formDataToSend.append(key, profile[key]);
                } else if (profile[key] !== null && key !== 'certification') {
                    formDataToSend.append(key, profile[key]);
                }
            });
    
            await Axiosinstance.put('update_profile/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowSuccessAlert(true);
            setShowErrorAlert(false);
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (error) {
            console.error('Error updating profile:', error);
            let errorMessage = 'Failed to update profile. Please try again.';
            if (error.response && error.response.data) {
                if (error.response.data.username) {
                    errorMessage = error.response.data.username[0]; // Handle username error
                } else if (error.response.data.email) {
                    errorMessage = error.response.data.email[0]; // Handle email error
                } else if (error.response.data.certification) {
                    errorMessage = error.response.data.certification[0]; // Handle certification error
                }
            }
            setErrorMessage(errorMessage);
            setShowSuccessAlert(false);
            setShowErrorAlert(true);
        }
        setLoading(false);
    };

    return (
        <Container fluid className="p-3">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <h2 className="mb-4 text-center">Edit Profile</h2>
                    {showSuccessAlert && (
                        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                            Profile updated successfully.
                        </Alert>
                    )}
                    {showErrorAlert && (
                        <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                            {errorMessage}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={profile.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={profile.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="course_completed">
                            <Form.Label>Course Completed</Form.Label>
                            <Form.Control
                                type="text"
                                name="course_completed"
                                value={profile.course_completed}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="certification">
                            <Form.Label>Certification</Form.Label>
                            <Form.Control
                                type="file"
                                name="certification"
                                onChange={handleChange}
                                accept=".pdf,.doc,.docx"
                            />
                            {certificationName && !profile.certification && (
                                <div className="mt-2">
                                    <small className="text-muted">Selected file: {certificationName}</small>
                                </div>
                            )}
                            {profile.certification && (
                                <div className="mt-2">
                                    <small className="text-muted">Current file: {certificationName}</small>
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group controlId="department">
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                                as="select"
                                name="department"
                                value={profile.department}
                                onChange={handleChange}
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
                            <Button variant="primary" type="submit" className='mt-4'>
                                Update Profile
                            </Button>
                        ) : (
                            <Button variant="primary" type="submit" disabled className='mt-4'>
                                Updating...
                            </Button>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Tledit;
