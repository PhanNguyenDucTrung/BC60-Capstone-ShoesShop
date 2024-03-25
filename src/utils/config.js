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
