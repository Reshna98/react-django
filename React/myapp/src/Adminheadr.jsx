import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/collapse';
import { Link } from 'react-router-dom';
import './Admin.css';



function Adminheader() {
  return (

    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent px-3">
  
    
      <button 
        className="navbar-toggler d-lg-none" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <i className='bi bi-justify'></i></button>
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
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownId">
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
