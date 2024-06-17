import axios from "axios";
import { getFromSessionStorage } from "../../utils/session-storage";

export const instance = axios.create({
    baseURL: '/api',
    withCredentials: true
});

instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.timeout = 6000;

instance.interceptors.request.use(function (config) {
    const accessToken = getFromSessionStorage('accessToken');
    // check if the request is sign up or login
    const isAuthRequest = config.url.includes('login') || config.url.includes('signup');
    if (accessToken && !isAuthRequest){
        // set the Authorization header if token is available Bearer + accessToken
        config.headers.Authorization = `Bearer ${accessToken}`;
    }else{
        // remove the Authorization header if token is not available
        delete config.headers.Authorization;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
const responseData = response.data;
    const responseObj = {
        data: responseData.content || responseData, // use content field if available
        content: responseData,
        meta: responseData.meta || null // use null if meta field is not available
    };
        return responseObj;
}, function (error) {
    console.error('error', error.response ? error.response.data : error);
    return Promise.reject(error);
});
