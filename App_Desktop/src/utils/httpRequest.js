import axios from 'axios';

const STATUS = {
    FORBIDDEN: 403,
};

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, option = {}) => {
    const resp = await request.get(path, option);
    if (resp.status === STATUS.FORBIDDEN) return null;
    return resp.data;
};

export const post = async (path, data, option) => {
    const resp = await request.post(path, data, option);
    if (resp.status === STATUS.FORBIDDEN) return null;
    return resp.data;
};
export const put = async (path, data) => {
    const resp = await request.put(path, data);
    if (resp.status === STATUS.FORBIDDEN) return null;
    return resp.data;
};

export const del = async (path) => {
    const resp = await request.delete(path);
    if (resp.status === STATUS.FORBIDDEN) return null;
    return resp.data;
};
export default request;
