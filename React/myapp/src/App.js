import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import RegistrationForm from './RegistrationForm';
import Tldash from './Tldash';
import Developerdash from './Developerdash';
import Admindash from './Admindash';
import Adminproject from './Adminproject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<RegistrationForm/>} />
        <Route path="/admin-dashboard" element={<Admindash />} />
        <Route path="/tl-dashboard" element={<Tldash />} />
        <Route path="/developer-dashboard" element={<Developerdash />} />
        <Route path="/project" element={<Adminproject />} />

      </Routes>
    </Router>
  );
}

export default App;
