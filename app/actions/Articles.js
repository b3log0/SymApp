import fetchService from '../services/FetchService';
import paginationStore from '../stores/Pagination';
import entityStore from '../stores/Entity';
import indexListStore from '../stores/IndexList';


const getList = pageIndex => fetchService.get(`${entityStore.pathname}?p=${pageIndex}`)
    .then((response) => {
      entityStore.setIsLoading(false);

      const data = response.data;
      paginationStore.setPage(pageIndex, data.pagination.paginationPageCount);

      // 适配多个接口，根据规则获取数据内容. key: comments, articles, users
      const keys = Object.keys(data);
      const key = keys[0] === 'pagination' ? keys[1] : keys[0];
      if (pageIndex === 1) {
        entityStore.setList(data[key]);
      } else {
        entityStore.setList(entityStore.list.concat(data[key]));
      }
    })
    .catch((error) => {
      console.error(error);
    });

const getIndex = pageIndex => fetchService.get(`articles/latest?p=${pageIndex}`)
    .then((response) => {
      indexListStore.setIsLoading(false);

      const data = response.data;

      indexListStore.setPage(pageIndex, data.pagination.paginationPageCount);

      if (pageIndex === 1) {
        indexListStore.setList(data.articles);
      } else {
        indexListStore.setList(indexListStore.list.concat(data.articles));
      }
    })
    .catch((error) => {
      console.error(error);
    });

export default {
  getList,
  getIndex
};
