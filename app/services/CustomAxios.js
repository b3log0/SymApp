import axios from 'axios';

const CustomAxios = axios.create({
    baseURL: 'https://hacpai.com/api/v2/',
    headers: {
        'content-type': 'application/json',
    },
    timeout: 10000,
    validateStatus:  (status) => {
        // TODO 404....
        return status >= 200 && status < 300; // default
    }
});

export default CustomAxios;
