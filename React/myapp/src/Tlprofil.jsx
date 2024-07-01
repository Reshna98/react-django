import React, { useState, useEffect } from 'react';
import Axiosinstance from './Axiosinstance'; // Adjust the path as per your project structure
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Tlprofil = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await Axiosinstance.get('tl_profile/');
                setProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setError('Failed to fetch profile. Please try again.');
            }
        };

        fetchProfile();
    }, []);

    const handleDownloadCertification = async (certificationUrl) => {
        try {
            const response = await Axiosinstance.get(`download_certification/${profile.id}/`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', certificationUrl.split('/').pop());
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading certification:', error);
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!profile) {
        // Return null or an empty component while profile is null to prevent initial loading message
        return null;
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="text-center">
                        <Card.Header as="h2">Profile</Card.Header>
                        <Card.Body>
                            <Card.Text><strong>Username:</strong> {profile.username}</Card.Text>
                            <Card.Text><strong>Email:</strong> {profile.email}</Card.Text>
                            <Card.Text><strong>Address:</strong> {profile.address}</Card.Text>
                            <Card.Text><strong>Course Completed:</strong> {profile.course_completed}</Card.Text>
                            {profile.certification && (
                                <Card.Text>
                                    <strong>Certification:</strong> 
                                    <Button 
                                        variant="link" 
                                        onClick={() => handleDownloadCertification(profile.certification)}
                                    >
                                        Download
                                    </Button>
                                </Card.Text>
                            )}
                            <Card.Text><strong>Department:</strong> {profile.department}</Card.Text>
                            <Card.Text><strong>Approval Status:</strong> {profile.is_approved}</Card.Text>
                            <Link to="/editprofile" className="btn btn-primary">
                                Edit Profile
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Tlprofil;
