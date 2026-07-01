import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.jolpi.ca/ergast/f1',
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
});

export default axiosInstance;
