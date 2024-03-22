import axios from "axios";
// import {jwtDecode} from 'jwt-decode';
export const TOKEN = 'accesstoken'
export const DOMAIN_BACKEND = 'https://shop.cyberlearn.vn'


export const http = axios.create({
    baseURL:DOMAIN_BACKEND, //domain
   // timeout:30000 //thời gian tối đa chờ của 1 request
})

