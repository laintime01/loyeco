import axios from "axios";
import { getFromLocalStorage } from "../../utils/local-storage";

export const instance = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        Authorization: 'Bearer admin@123.com'
    },
});

instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.timeout = 6000;

// instance.interceptors.request.use(function (config) {
//     const accessToken = getFromLocalStorage('accessToken');
//     if (accessToken) {
//         config.headers.Authorization = accessToken;
//     }
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

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
