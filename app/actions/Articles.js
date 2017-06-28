import fetchService from '../services/FetchService';
import paginationStore from '../stores/Pagination';
import entityStore from '../stores/Entity';
import indexListStore from '../stores/IndexList';


const getList = pageIndex => fetchService.get(`${entityStore.pathname}?p=${pageIndex}`)
    .then((response) => {
      console.log(pageIndex);
      entityStore.setIsLoading(false);

      const data = response.data;

      paginationStore.setPage(pageIndex, data.pagination.paginationPageCount);

      if (pageIndex === 1) {
        entityStore.setList(data.articles);
      } else {
        entityStore.setList(entityStore.list.concat(data.articles));
      }
    })
    .catch((error) => {
      console.error(error);
    });

const getIndex = pageIndex => fetchService.get(`articles/latest?p=${pageIndex}`)
    .then((response) => {
      console.log(pageIndex, 'article');
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
