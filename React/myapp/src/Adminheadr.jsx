import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

function Adminheader() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white px-3">
        <i className='bi bi-justify-left fs-4'></i>
    
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a 
              className="nav-link dropdown-toggle" 
              href="#" 
              id="dropdownId" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false">
              Admin
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownId">
              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
              <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Adminheader;
