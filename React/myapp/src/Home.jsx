import React from 'react';
import { Element } from 'react-scroll';
import Navbar1 from './Navbar1';

function Home() {
  return (
    <div>
      <Navbar1 />
      <Element name="home" className="element">
        <section id="home">
          <h2>Home Section</h2>
          <p>Welcome to our homepage.</p>
        </section>
      </Element>
      <Element name="about" className="element">
        <section id="about">
          <h2>About Us</h2>
          <p>Information about our company.</p>
        </section>
      </Element>
      <Element name="contact" className="element">
        <section id="contact">
          <h2>Contact Us</h2>
          <p>How to reach us.</p>
        </section>
      </Element>
      <Element name="clients" className="element">
        <section id="clients">
          <h2>Clients</h2>
          <p>Our esteemed clients.</p>
        </section>
      </Element>
    </div>
  );
}

export default Home;
