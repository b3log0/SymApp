import fetchService from '../services/FetchService';
import homeStore from '../stores/Home';

const getIndex = async (pageIndex) => {
  try {
    const response = await fetchService.get(`articles/latest?p=${pageIndex}`);
    homeStore.setIsLoading(false);

    const data = response.data;

    homeStore.setPage(pageIndex, data.pagination.paginationPageCount);

    if (pageIndex === 1) {
      homeStore.setList(data.articles);
    } else {
      homeStore.setList(homeStore.list.concat(data.articles));
    }
  } catch (error) {
    console.error(error);
  }
};

export default {
  getIndex
};
