import React, { useEffect, useState } from 'react';
import Adminheadr from './Adminheadr';
import Adminsidebar from './Adminsidebar';
import AddedPro from './AddedPro';
import Axiosinstance from './Axiosinstance';

function Adminaddedpro() {
  const [toggle, setToggle] = useState(window.innerWidth <= 768);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axiosinstance.get('get_projects/');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();

    const handleResize = () => {
      setToggle(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="d-flex">
      <div className={toggle ? "d-none" : "w-auto position-fixed"}>
        <Adminsidebar />
      </div>
      <div className={`flex-grow-1 ${toggle ? "w-100" : "ms-sidebar"}`}>
        <Adminheadr Toggle={handleToggle} />
        <div className="container mt-4"> {/* Adjust margin top here */}
          
          {projects.length > 0 && (
            <AddedPro projects={projects} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Adminaddedpro;
