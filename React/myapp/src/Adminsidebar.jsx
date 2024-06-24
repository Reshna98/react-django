import React from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './adMin.css';

function Adminsidebar(){
  return (
        <div className='sidebar d-flex justify-content-between flex-column bg-dark text-white vh-100 py-3 ps-3 pe-5'>
            <div>
              <div className='p-3'>
                <i className='bi bi-code-slash fs-4 me-4'/>

                <span className='fs-4 text-white'>Admin</span>
                </div>


         <hr className='text-white mt-2'/>
         <ul className='nav nav-pill flex-column'>
        <li className='nav-item p-2'>
        <Link to="/admin-dashboard"className=' p-1'>
          <i className='bi bi-speedometer2 me-3 fs-4 text-white' />
          <span className='fs-4 text-white'><strong>Dashboard</strong></span>
        </Link>
      </li>
      <li className='nav-item p-2'>
      <Link to="/project" className=' p-1'>
      <i className='bi bi-speedometer2 me-3 fs-4' />
      <span className='fs-4'><strong>Projects</strong></span>
        </Link>
      </li>
         </ul>
     </div>
     <div>
      <hr className='text-white'/>
      <div className='nav-item p-2'>
        <Link to="" className='p-1'>
          <i className='bi bi-person-circle me-3 fs-4'></i>
          <span className='fs-4'><strong>Logout</strong></span>

        </Link>
      </div>

      </div>
     </div>
  )
}

export default Adminsidebar