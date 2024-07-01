import React, { useState, useEffect } from 'react';
import Axiosinstance from './Axiosinstance';
import { Container, Row, Col } from 'react-bootstrap';
import Tlheader from './Tlheader';
import TlSidebar from './Tlsidebar';
import Tlprofil from './Tlprofil'; // Ensure correct import path for Tlprofil

function Tlprofiledas() {
    const [toggle, setToggle] = useState(window.innerWidth <= 768);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setToggle(true);
            } else {
                setToggle(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="d-flex">
            <div className={toggle ? "d-none" : "w-auto position-fixed"}>
                <TlSidebar />
            </div>
            <div className={`flex-grow-1 ${toggle ? "" : "ms-sidebar"}`}>
                <Tlheader Toggle={handleToggle} />
                <Container fluid className="p-3">
                    <Row className="justify-content-center">
                        <Col xs={12} md={8}>
                            <Tlprofil />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Tlprofiledas;
