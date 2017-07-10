import fetchService from '../services/FetchService';

const getList = async (pageIndex, pathname) => {
  try {
    const response = await fetchService.get(`${pathname}?p=${pageIndex}`);
    const data = response.data;

    // 适配多个接口，根据规则获取数据内容. key: comments, articles, users
    const keys = Object.keys(data);
    let key = '';
    keys.forEach((k) => {
      if (k !== 'pagination' && k !== 'isFollowing' && k !== 'tag' && k !== 'domain') {
        key = k;
      }
    });

    return Promise.resolve({
      list: data[key],
      pageTotal: data.pagination.paginationPageCount
    });
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export default {
  getList
};
