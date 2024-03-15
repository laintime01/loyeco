// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
    baseURL:'/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { instance };
