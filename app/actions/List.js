import fetchService from '../services/FetchService';

const getList = async (pageIndex, entityStore) => {
  try {
    entityStore.setIsLoading(true);
    const response = await fetchService.get(`${entityStore.pathname}?p=${pageIndex}`);
    const data = response.data;

    // 适配多个接口，根据规则获取数据内容. key: comments, articles, users
    const keys = Object.keys(data);
    let key = '';
    keys.forEach((k) => {
      if (k !== 'pagination' && k !== 'isFollowing' && k !== 'tag' && k !== 'domain') {
        key = k;
      }
    });

    if (pageIndex === 1) {
      entityStore.setList(data[key], pageIndex, data.pagination.paginationPageCount);
    } else {
      entityStore.setList(entityStore.list.concat(data[key]),
        pageIndex, data.pagination.paginationPageCount);
    }

    entityStore.setIsLoading(false);
  } catch (error) {
    console.error(error);
  }
};

export default {
  getList
};
