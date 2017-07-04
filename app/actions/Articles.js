import fetchService from '../services/FetchService';
import indexListStore from '../stores/IndexList';

const getIndex = async (pageIndex) => {
  try {
    const response = await fetchService.get(`articles/latest?p=${pageIndex}`);
    indexListStore.setIsLoading(false);

    const data = response.data;

    indexListStore.setPage(pageIndex, data.pagination.paginationPageCount);

    if (pageIndex === 1) {
      indexListStore.setList(data.articles);
    } else {
      indexListStore.setList(indexListStore.list.concat(data.articles));
    }
  } catch (error) {
    console.error(error);
  }
};

export default {
  getIndex
};
