import { $host, $authHost } from './index';
import { jwtDecode } from 'jwt-decode';

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const  getAllOrganization = async () => {
    await sleep();
    const { data } = await $host.get(`/organization`);
    return data;
}

export const  getOneOrganization = async (id) => {
    const { data } = await $host.get(`/organization/${id}`);
    return data;
}

export const getAllMembershipsOrganization = async (organizationId) => {
    const { data } = await $host.get(`/membership/${organizationId}`);
    return data;
}

export const registration = async (email, password, fullName, phone) => {
    const { data } = await $host.post('/user/registration', { email, password, full_name: fullName, phone });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const { data } = await $host.post('/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const check = async () => {
    const { data } = await $authHost.get('/user/auth');
    localStorage.setItem('token', data.token);
    console.log(data.token)
    return jwtDecode(data.token);
}