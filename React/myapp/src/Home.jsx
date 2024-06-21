import React from 'react';
import { Element } from 'react-scroll';
import Navbar1 from './Navbar1';
import './hoMe.css';
import { Container, Row, Col,Card, Carousel } from 'react-bootstrap';


function Home() {
  return (
    <div>
      <Navbar1 />
      <Element name="home" className="element">
        <section id="home" className="section">
          <Container fluid className="p-0">
            <Row className="no-gutters h-100 align-items-center justify-content-center">
              <Col xs={12} className="position-relative p-0 h-100">
                <img src="/home.jpg" alt="Home" className="img-fluid w-100 section-image" />
                <h2 className="section-heading">Welcome To IT-Company</h2>
              </Col>
            </Row>
          </Container>
        </section>
      </Element>
      <Element name="about" className="element">
        <section id="about" className="about-section">
          <Container>
            <Row>
              <Col>
                <h2 className="about-head">About Us</h2>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={6} className="about-image p-0">
                <img src="about.jpg" alt="About Us" className="img-fluid section-image-about" />
              </Col>
              <Col md={6} className="about-text">
                <p>Welcome to IT-Company, a leader in innovative technology solutions. Founded with the vision of driving digital transformation, we specialize in providing top-notch IT services and products that cater to businesses of all sizes. Our team of dedicated professionals is committed to delivering exceptional results through a comprehensive range of services, including software development, cloud computing, cybersecurity, and IT consulting. We pride ourselves on our ability to understand the unique challenges our clients face and tailor our solutions to meet their specific needs. At IT-Company, we are passionate about helping our clients achieve their business goals and stay ahead in the ever-evolving technological landscape.</p>
              </Col>
            </Row>
          </Container>
        </section>
    
      </Element>
      <Element name="clients" className="element">
        <section id="clients" className="sectionc">
          <Container>
            <Row className="justify-content-center">
              <Col>
                <h2 className="about-head">Our Clients</h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={12} md={4} className="d-flex justify-content-center">
                <Card className="client-card">
                  <Card.Img variant="top" src="client1.jpg" />
                  <Card.Body>
                    <Card.Title>Client 1</Card.Title>
                    <Card.Text>Review from Client 1.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} className="d-flex justify-content-center">
                <Card className="client-card">
                  <Card.Img variant="top" src="client3.jpg" />
                  <Card.Body>
                    <Card.Title>Client 2</Card.Title>
                    <Card.Text>Review from Client 2.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} className="d-flex justify-content-center">
                <Card className="client-card">
                  <Card.Img variant="top" src="client4.jpg" />
                  <Card.Body>
                    <Card.Title>Client 3</Card.Title>
                    <Card.Text>Review from Client 3.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={12} md={4} className="d-flex justify-content-center">
                <Card className="client-card">
                  <Card.Img variant="top" src="client1.jpg" />
                  <Card.Body>
                    <Card.Title>Client 4</Card.Title>
                    <Card.Text>Review from Client 4.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} className="d-flex justify-content-center">
                <Card className="client-card">
                  <Card.Img variant="top" src="client3.jpg" />
                  <Card.Body>
                    <Card.Title>Client 5</Card.Title>
                    <Card.Text>Review from Client 5.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} className="d-flex justify-content-center">
                <Card className="client-card">
                  <Card.Img variant="top" src="client4.jpg" />
                  <Card.Body>
                    <Card.Title>Client 6</Card.Title>
                    <Card.Text>Review from Client 6.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </Element>
<Element name="contact" className="element">
      <section id="contact" className="section">
        <Container>
        <Row className="justify-content-center">
        <Col>
          <h2 className="cohead">Contact Us</h2>
        </Col>
      </Row>
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={6}>
              <Card className="contact-card">
                <Card.Body>
                  <Card.Title>Contact Details</Card.Title>
                  <Card.Text>
                    <strong>Address:</strong> 123 Main Street, Anytown, USA<br />
                    <strong>Phone:</strong> (123) 456-7890<br />
                    <strong>Email:</strong> info@example.com
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="contact-card">
                <Card.Body>
                  <Card.Title>Our Location</Card.Title>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.9023398831715!2d144.95373551516775!3d-37.816279442021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f3ba39f4be48!2sVictoria%20Market!5e0!3m2!1sen!2sau!4v1615878355426!5m2!1sen!2sau"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Map"
                  ></iframe>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </Element>
    <footer className="mt-auto py-3 bg-light">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Information</h5>
            <address>
              123 Main Street<br />
              City, State ZIP Code<br />
              Phone: 123-456-7890<br />
              Email: info@example.com
            </address>
          </Col>
        </Row>
      </Container>
    </footer>


    </div>
  );
}

export default Home;
