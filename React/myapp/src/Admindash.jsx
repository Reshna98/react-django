import { useState } from 'react'
import styles from './adMin.css';
import Adminheadr from './Adminheadr'
import Adminsidebar from './Adminsidebar'
import Adminhome from './Adminhome'

function Admindash() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className={styles.gridContainer}>
      <Adminheadr OpenSidebar={OpenSidebar}/>
      <Adminsidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Adminhome />
    </div>
  )
}

export default Admindash