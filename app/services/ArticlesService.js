import axios from 'axios';

const getList = axios.get('https://hacpai.com/api/v2/articles/latest?p=1')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

export default {
    getList
}