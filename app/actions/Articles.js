import fetchService from '../services/FetchService';
import paginationStore from '../stores/Pagination';
import entityStore from '../stores/Entity';

const getList = (pathname, pageIndex) => fetchService.get(`${pathname}?p=${pageIndex}`)
  .then((response) => {
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

export default {
  getList
};
