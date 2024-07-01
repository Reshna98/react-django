// import axios from 'axios';

// const Axiosinstance = axios.create({
//   baseURL: 'http://localhost:8000/',
// });

// Axiosinstance.interceptors.request.use(
//   async (config) => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Axiosinstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = await Axiosinstance.post('/token/refresh/', { refresh: refreshToken });

//         localStorage.setItem('accessToken', response.data.access);
//         return Axiosinstance(originalRequest);
//       } catch (refreshError) {
//         console.error('Refresh token failed', refreshError);
//         // Handle refresh token failure (e.g., redirect to login page)
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default Axiosinstance;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Axiosinstance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    // Add any additional headers if necessary
}
});

Axiosinstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axiosinstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await Axiosinstance.post('/token/refresh/', { refresh: refreshToken });
          localStorage.setItem('accessToken', response.data.access);

          // Update original request with new access token
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return Axiosinstance(originalRequest);
        } else {
          // Redirect to login page if no refresh token is found
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        // Redirect to login page if refresh token fails
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default Axiosinstance;


