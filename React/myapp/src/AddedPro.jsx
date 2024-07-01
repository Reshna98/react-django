// import React from 'react';
// import './adMin.css'; // Assuming this file contains additional styling

// function AddedPro({ projects }) {
//   return (
//     <div className="container-fluid p-3">
//       <div className="row justify-content-center">
//         <div className="col-12 col-md-10">
//           <div className="table-responsive">
//             <h2 className="my-4 text-center">Projects</h2>
//             <table className="table table-bordered text-start">
//               <thead>
//                 <tr>
//                   <th>Client Name</th>
//                   <th>Project Name</th>
//                   <th>Description</th>
//                   <th>Requirements</th>
//                   <th>Start Date</th>
//                   <th>End Date</th>
//                   <th>Attachments</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {projects.map(project => (
//                   <tr key={project.id}>
//                     <td>{project.client_name}</td>
//                     <td>{project.project_name}</td>
//                     <td>{project.description}</td>
//                     <td>{project.requirements}</td>
//                     <td>{project.start_date}</td>
//                     <td>{project.end_date}</td>
//                     <td>
//                       {project.attachments ? (
//                         <a href={project.attachments} target="_blank" rel="noopener noreferrer">Open Attachment</a>
//                       ) : (
//                         "No attachment"
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddedPro;
import React from 'react';
import Axiosinstance from './Axiosinstance';
import fileDownload from 'js-file-download'; 

function AddedPro({ projects }) {
  const handleDownload = async (projectId, filename) => {
    try {
      const response = await Axiosinstance.get(`download_attachment/${projectId}/`, {
        responseType: 'blob' 
      });

      fileDownload(response.data, filename); 

    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="container-fluid p-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10">
          <div className="table-responsive">
            <h2 className="my-4 text-center">Projects</h2>
            <table className="table table-bordered text-start">
              <thead>
                <tr  className="text-center">
                  <th>Client Name</th>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Requirements</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Attachments</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id}  className="text-center">
                    <td>{project.client_name}</td>
                    <td>{project.project_name}</td>
                    <td>{project.description}</td>
                    <td>{project.requirements}</td>
                    <td>{project.start_date}</td>
                    <td>{project.end_date}</td>
                    <td className="text-center">
                      {project.attachments ? (
                        <button
                          className="btn btn-link text-center"
                          onClick={() => handleDownload(project.id, project.attachments)}
                        >
                          Download Attachment
                        </button>
                      ) : (
                        "No attachment"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddedPro;
