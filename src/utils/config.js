import axios from 'axios';

const api = axios.create({
    baseURL: 'https://shop.cyberlearn.vn/api',
    // timeout: 5000, // Set the timeout value as per your requirement
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;

// import {jwtDecode} from 'jwt-decode';
export const TOKEN = 'accesstoken';
export const DOMAIN_BACKEND = 'https://shop.cyberlearn.vn';

export const http = axios.create({
    baseURL: DOMAIN_BACKEND, //domain
    // timeout:30000 //thời gian tối đa chờ của 1 request
});
