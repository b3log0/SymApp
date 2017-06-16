import ArticlesService from '../services/ArticlesService';

import paginationStore from '../stores/Pagination';
import articleStore from '../stores/Articles';

const getList = pageIndex => ArticlesService.getList(pageIndex)
  .then((response) => {

    articleStore.setIsLoading(false);

    const data = response.data;

    paginationStore.setPage(pageIndex, data.pagination.paginationPageCount);

    if (pageIndex === 1) {
      articleStore.setList(data.articles);
    } else {
      articleStore.setList(articleStore.list.concat(data.articles));
    }
  })
  .catch((error) => {
    console.error(error);
  });

export default {
  getList
};
