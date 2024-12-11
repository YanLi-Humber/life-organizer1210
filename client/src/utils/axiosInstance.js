import axios from 'axios';

// Create an instance of Axios with the correct base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8001/api', // Replace with your backend server URL
});

export default axiosInstance;
