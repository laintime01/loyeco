import axios from "axios";
import { getFromLocalStorage } from "../../utils/local-storage";

export const instance = axios.create({
    baseURL: '/api', // 设置代理地址为本地地址
});

//check baseURL console.log
console.log('baseURL:', instance.defaults.baseURL);

instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

instance.interceptors.request.use(function (config) {
    const accessToken = getFromLocalStorage('accessToken');
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    const responseObj = {
        data: response?.data?.data,
        meta: response?.data?.meta
    }
    return responseObj;
}, function (error) {
    return Promise.reject(error);
});
