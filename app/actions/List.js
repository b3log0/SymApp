import fetchService from '../services/FetchService';

const getList = async (pageIndex, pathname) => {
  try {
    const response = await fetchService.get(`${pathname}?p=${pageIndex}`);
    const data = response.data;

    // 适配多个接口，根据规则获取数据内容.
    const keys = Object.keys(data);
    let list = [];
    keys.forEach((k) => {
      if (k === 'comments' || k === 'users' || k === 'tags' || k === 'articles'
        || k === 'commentedNotifications' || k === 'replyNotifications'
        || k === 'atNotifications') {
        list = data[k];
      }

      if (k === 'article') {
        if (typeof data[k].articleComments === 'object') {
          list = data[k].articleComments;
        } else {
          list = data[k];
        }
      }
    });

    return Promise.resolve({
      list,
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
