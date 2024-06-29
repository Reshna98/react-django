import React, { useEffect, useState } from 'react';
import Adminheadr from './Adminheadr';
import Adminsidebar from './Adminsidebar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Assignment from './Assignment';

function Assignmentadmin() {
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
        <Adminsidebar />
      </div>
      <div className={`flex-grow-1 ${toggle ? "w-100" : "ms-sidebar"}`}>
        <Adminheadr Toggle={handleToggle} />
        <Assignment/>
      </div>
    </div>
  );
}

export default  Assignmentadmin;
