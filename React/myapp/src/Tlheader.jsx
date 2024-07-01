import React from 'react';
import { useNavigate } from 'react-router-dom';
import Axiosinstance from './Axiosinstance'; // Assuming Axiosinstance is correctly configured

function Adminheadr({ Toggle }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.error('No refresh token found');
        return;
      }
  
      // Log token for debugging (remove in production)
      console.log('Refresh Token:', refreshToken);
  
      const response = await Axiosinstance.post('tllogout/', { "refresh_token": refreshToken });
  
      // Clear local storage or cookies where you store your tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
  
      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand d-block d-md-none" onClick={Toggle}><i className='bi bi-justify'></i></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white rounded border" href="#" onClick={handleLogout}>Logout</a>
            </li>
          </ul> 
        </div>
      </div>
    </nav>
  );
}

export default Adminheadr;
