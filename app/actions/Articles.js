import fetchService from '../services/FetchService';
import paginationStore from '../stores/Pagination';
import entityStore from '../stores/Entity';
import indexListStore from '../stores/IndexList';

const getList = async (pageIndex) => {
  try {
    const response = await fetchService.get(`${entityStore.pathname}?p=${pageIndex}`);
    entityStore.setIsLoading(false);

    const data = response.data;
    paginationStore.setPage(pageIndex, data.pagination.paginationPageCount);

    // 适配多个接口，根据规则获取数据内容. key: comments, articles, users
    const keys = Object.keys(data);
    let key = '';
    keys.forEach((k) => {
      if (k !== 'pagination' && k !== 'isFollowing') {
        key = k;
      }
    });
    if (pageIndex === 1) {
      entityStore.setList(data[key]);
    } else {
      entityStore.setList(entityStore.list.concat(data[key]));
    }
  } catch (error) {
    console.error(error);
  }
};

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
  getList,
  getIndex
};
