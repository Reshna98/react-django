import React from 'react';
import { Element } from 'react-scroll';
import Navbar1 from './Navbar1';
import './Home.css';


function Home() {
  return (
    <div>
      <Navbar1 />
      <Element name="home" className="element">
        <section id="home" className="section">
          <h2 className="section-heading">Welcom To IT-Company</h2>
          <img src="/home.jpg" alt="Home" className="section-image" />
        </section>
      </Element>
      <Element name="about" className="element">
        <section id="about" className="section">
          <div className="content">
            <div className="left">
              <h2>About Us</h2>
              <p>Information about our company.</p>
            </div>
            <div className="right">
              <img src="/images/about-image.jpg" alt="About Us" className="section-image" />
            </div>
          </div>
        </section>
      </Element>
      <Element name="contact" className="element">
        <section id="contact" className="section">
          <h2>Contact Us</h2>
          <p>How to reach us.</p>
          <img src="/images/contact-image.jpg" alt="Contact Us" className="section-image" />
        </section>
      </Element>
      <Element name="clients" className="element">
        <section id="clients" className="section">
          <h2>Clients</h2>
          <p>Our esteemed clients.</p>
          <img src="home.jpg" alt="Clients" className="section-image" />
        </section>
      </Element>
    </div>
  );
}

export default Home;
