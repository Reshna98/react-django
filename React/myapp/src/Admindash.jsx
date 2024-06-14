import { useState } from 'react'
import './Admin.css'


import Adminheadr from './Adminheadr'
import Adminsidebar from './Adminsidebar'
import Adminhome from './Adminhome'

function Admindash(){
  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      <div className='row'>
        <div className='col-2 bg-white vh-100'>
          <Adminsidebar/>
        </div>
        <div className='col'>
          <Adminhome/>
        </div>
      </div>
    </div>
  )
}

export default Admindash