import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Correct import syntax
// import './Admin.css';

function Adminsidebar() {
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <i className='bi bi-bootstrap-fill fs-3 me-2'></i>
        <span className='brand-name fs-4 '>IT-Company</span>
      </div>
      <hr className='text-dark'/>
      <div className='list-group list-group-flush'>
        <a className='list-group-item  py-2'>
          <i className='bi bi-bootstrap-fill fs-5 me-3'></i>
          <span className='fs-5'>Dashboard</span>
        </a>
        <a  className='list-group-item  py-2'>
          <i className='bi bi-bootstrap-fill me-3'></i>
          <span className='fs-5'>Products</span>
        </a>
         <a  className='list-group-item  py-2'>
          <i className='bi bi-bootstrap-fill me-3'></i>
          <span className='fs-5'>TL</span>
        </a>
         <a  className='list-group-item  py-2'>
          <i className='bi bi-bootstrap-fill me-3'></i>
          <span className='fs-5'>Developer</span>
        </a>
         <a  className='list-group-item  py-2'>
          <i className='bi bi-bootstrap-fill me-3'></i>
          <span className='fs-5'>Reports</span>
        </a>
        <a  className='list-group-item  py-2'>
          <i className='bi bi-bootstrap-fill me-3'></i>
          <span className='fs-5'>Reports</span>
        </a>
        <a  className='list-group-item  py-2'>
          <i className='bi bi-bootstrap-fill me-3'></i>
          <span className='fs-5'>Reports</span>
        </a>
       
      </div>
    </div>
  );
}

export default Adminsidebar;
