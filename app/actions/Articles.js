import ArticlesService from '../services/ArticlesService';

const getList = () => ArticlesService.getList
    .then((response) => {
        return response.json()
    })
    .then((response) => {
        return Promise.resolve(response)
    })
    .catch((error) => {
        console.error(error);
    })

export default {
    getList
}