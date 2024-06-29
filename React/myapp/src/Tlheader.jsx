import React from 'react'

function Tlheadr({Toggle}) {
  return (
    
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    {/* <a className="navbar-brand text-white d-none d-md-block" href="#">Dashboard</a> */}
    <a className="navbar-brand d-block d-md-none" onClick={Toggle}><i className='bi bi-justify'></i></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <a className="nav-link text-white rounded border" aria-current="page" href="#">Profile</a>
        </li> */}
        <li className="nav-item">
          <a className="nav-link text-white rounded border" href="#">Logout</a>
        </li>
       
       
      </ul>
    
    </div>
  </div>
</nav>
    

  )
}

export default Tlheadr