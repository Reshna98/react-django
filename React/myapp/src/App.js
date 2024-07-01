import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import RegistrationForm from './RegistrationForm';
import Tldash from './Tldash';
import Developerdash from './Developerdash';
import Admindash from './Admindash';
import Adminproject from './Adminproject';

import Adminaddedpro from './Adminaddedpro';

import Assignmentadmin from './Assignmentadmin';
import TeamLeadRegistrationForm from './TeamLeadRegistrationForm';
import DeveloperRegistrationForm from './DeveloperRegistrationForm';
import NotificationTable from './NotificationTable.jsx';
import Adminnoti from './Adminnoti.jsx';
import AdminCreateUserForm from './AdminCreateUserForm.jsx';
import Aduser from './Aduser.jsx';
import Addelete from './Addelete.jsx';
import Adpromote from './Adpromote.jsx';
import Tlassign from './TLassign.jsx';
import Tlassignpro from './Tlassignpro.jsx';
import Tlmoduleassign from './Tlmoduleassign.jsx';
import Tlprofiledas from './Tlprofiledas.jsx';
import Tleditpro from './Tleditpro.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/registration" element={<RegistrationForm/>} /> */}
        <Route path="/admin-dashboard" element={<Admindash />} />
        <Route path="/tl-dashboard" element={<Tldash />} />
        <Route path="/developer-dashboard" element={<Developerdash />} />
        <Route path="/project" element={<Adminproject />} />
        <Route path="/addedpro" element={< Adminaddedpro />} />
        <Route path="/assignment" element={< Assignmentadmin />} />
        <Route path="/register-team-lead" element={<TeamLeadRegistrationForm/>} />
        <Route path="/register-developer" element={<DeveloperRegistrationForm/>} />
        <Route path="/notification" element={<Adminnoti/>} />
        <Route path="/add" element={<Aduser/>} />
        <Route path="/users" element={<Addelete/>} />
        <Route path="/promote" element={<Adpromote/>} />
        <Route path="/tlnotification" element={<Tlassign/>} />
        <Route path="/tl-dashboard" element={<Tldash />} />
        <Route path="/tlassignpro" element={<Tlassignpro/>} />
        <Route path="/tlmodule" element={<Tlmoduleassign/>} />
        <Route path="/profile" element={<Tlprofiledas/>} />
        <Route path="/editprofile" element={<Tleditpro/>} />




      </Routes>
    </Router>
  );
}

export default App;
