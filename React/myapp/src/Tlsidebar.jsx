
// export default Adminsidebar
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './adMin.css';

function TlSidebar() {
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const toggleProjectDetails = () => {
    setShowProjectDetails(!showProjectDetails);
  };

  return (
    <div className='sidebar bg-dark text-white vh-100 py-3 ps-3 pe-4'>
      <div className='p-2'>
        <i className='bi bi-code-slash p-2 mt-auto' />
        <span className='fs-3 text-white'>TL</span>
      </div>
      <hr className='text-white mt-2 mb-4' />
      <ul className='nav flex-column '>
        <li className='nav-item p-1 mt-auto'>
          <Link to="/tl-dashboard" className='nav-link'>
            <i className='bi bi-speedometer2 me-2 fs-4 text-white' />
            <span className='fs-5 text-white'><strong>Dashboard</strong></span>
          </Link>
        </li>
       
        <li className='nav-item p-1 mt-auto'>
          <Link to="/tlnotification" className='nav-link'>
            <i className='bi bi-speedometer2 me-2 fs-4 text-white' />
            <span className='fs-5 text-white'><strong>Notification</strong></span>
          </Link>
        </li>
        <li className='nav-item p-1 mt-auto'>
          <Link to="/tlmodule" className='nav-link'>
            <i className='bi bi-speedometer2 me-2 fs-4 text-white' />
            <span className='fs-5 text-white'><strong>Assign Modules</strong></span>
          </Link>
        </li>
        <li className='nav-item p-1 mt-auto'>
          <Link to="/tlassignpro" className='nav-link'>
            <i className='bi bi-speedometer2 me-2 fs-4 text-white' />
            <span className='fs-5 text-white'><strong>Assign Projects</strong></span>
          </Link>
        </li>
        <li className='nav-item p-1 mt-auto'>
          <Link to="" className='nav-link'>
            <i className='bi bi-speedometer2 me-2 fs-4 text-white' />
            <span className='fs-5 text-white'><strong>Projects Progress</strong></span>
          </Link>
        </li>
       
       
       
      </ul>
      <hr className='text-white mt-4' />
      <div className='nav-item p-2 mt-auto'>
        <Link to="/profile" className='nav-link'>
          <i className='bi bi-person-circle me-2 fs-4'></i>
          <span className='fs-5'><strong>Profile</strong></span>
        </Link>
      </div>
    </div>
  );
}

export default TlSidebar;





