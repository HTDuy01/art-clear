import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response;
};

export default httpRequest;
