// utils/calendarApi.js
import axios from 'axios';

// Create a new Axios instance for calendar-related API calls
const calendarApi = axios.create({
    baseURL: 'http://localhost:8001', // Use the correct backend base URL without the `/api` prefix
});

export default calendarApi;
