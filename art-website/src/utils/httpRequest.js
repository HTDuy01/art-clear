import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://art-clear-backend.onrender.com/api/auth',
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response;
};

export default httpRequest;
