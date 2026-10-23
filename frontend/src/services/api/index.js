import axios from "axios";
export const URL = import.meta.env.VITE_API_URL;

export const $host = axios.create({
    baseURL: URL
});

export const $authHost = axios.create({
    baseURL: URL
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}

$authHost.interceptors.request.use(authInterceptor);