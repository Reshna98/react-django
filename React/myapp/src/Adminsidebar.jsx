import React from 'react'
import { Link } from 'react-router-dom';


function Adminsidebar(){
  return (
        <div className='d-flex justify-content-between flex-column bg-dark text-white'>
            <div>
                <i className='bi bi-code-slash fs-4 me-4'/>

                <span className='fs-4'>Admin</span>


         <hr className='text-secondary'/>
         <ul className='nav nav-pill flex-coloumn'>
        <li className='nav-item'>
        <Link to="/admin-dashboard">
          <i className='bi bi-speedometer2 me-3' />
          <span><strong>Dashboard</strong></span>
        </Link>
      </li>
      <li className='nav-item'>
      <Link to="/project">
      <i className='bi bi-speedometer2 me-3' />
      <span><strong>Projects</strong></span>
        </Link>
      </li>
         </ul>
     </div>
     </div>
  )
}

export default Adminsidebar