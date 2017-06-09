import ArticlesService from '../services/ArticlesService';

const getList = () => ArticlesService.getList().then(
    res => Promise.resolve(res.data.data)
);

export default {
    getList
}