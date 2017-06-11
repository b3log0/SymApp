import ArticlesService from '../services/ArticlesService';

const getList = (currentPage) => ArticlesService.getList(currentPage)
    .then((response) => {
        return Promise.resolve(response)
    })
    .catch((error) => {
        console.error(error);
    });

export default {
    getList
}