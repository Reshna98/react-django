import { useState } from 'react'
import './Admin.css'


import Adminheadr from './Adminheadr'
import Adminsidebar from './Adminsidebar'
import Adminhome from './Adminhome'

function Admindash() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Adminheadr OpenSidebar={OpenSidebar}/>
      <Adminsidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Adminhome />
    </div>
  )
}

export default Admindash