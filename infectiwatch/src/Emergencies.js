import React from 'react';
import './Emergencies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Emergencies = () => {
  return (
    <div className="emergencies-container">
      <div className="background-image">
        {/* httphttps://media.istockphoto.com/id/1312765142/photo/businessman-hold-virtual-medical-network-connection-icons-covid-19-pandemic-develop-people.jpg?s=2048x2048&w=is&k=20&c=TYz3Pioyd5CG2GsCwRcDYxYYpalN1yRp6l6eENJXyMk=s://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  */}
      </div>
      <div className="content">
        <h2>About Our Medical Institution</h2>
        <p>
          Welcome to our medical institution! We are dedicated to providing
          high-quality healthcare and emergency services to our community. Our
          team of experienced professionals is here to help you in times of need.
        </p>
        <form className='contact-form'>
          <input type='text' placeholder='Name' />
          <input type='text' placeholder='Phone Number'/>
          <button type='submit' id='submit'>Submit</button>
        </form>
        <div className="contact-info">
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@example.com</p>
        </div>
        <div className="social-links">
          <a href="#">
            <FontAwesomeIcon icon={faFacebook} /> Facebook
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} /> Twitter
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} /> Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Emergencies;