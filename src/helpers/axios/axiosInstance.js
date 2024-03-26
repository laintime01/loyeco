import axios from "axios";
import { getFromLocalStorage } from "../../utils/local-storage";

export const instance = axios.create({
    baseURL: '/api',
    withCredentials: true,
// for quick testing will remove when aployed to production
    headers: {
        Authorization: 'Bearer admin@123.com'
    },
});

instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.timeout = 6000;

instance.interceptors.request.use(function (config) {
    const accessToken = getFromLocalStorage('accessToken');
    console.log('accessToken', accessToken);
    if (accessToken) {
        // set the Authorization header if token is available Bearer + accessToken
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
const responseData = response.data;
    const responseObj = {
        data: responseData.content || responseData, // 如果没有content字段，则直接使用responseData
        content: responseData,
        meta: responseData.meta || null // 如果没有meta字段，则设为null
    };
        return responseObj;
}, function (error) {
    console.error('error', error.response ? error.response.data : error);
    return Promise.reject(error);
});
