import React, { useState } from 'react';
import './proJect.module.css';
import Adminheadr from './Adminheadr';
import Adminsidebar from './Adminsidebar';
import Project from './Project';

function Adminproject() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Adminheadr OpenSidebar={OpenSidebar} />
      <Adminsidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className="content centered-content">
        <Project />
      </div>
    </div>
  );
}

export default Adminproject;
