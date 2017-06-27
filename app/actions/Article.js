import { Alert, AsyncStorage } from 'react-native';

import FetchService from '../services/FetchService';
import articleStore from '../stores/Article';

const getDetail = pageIndex => FetchService.get(pageIndex)
  .then((response) => {
    // entityStore.setIsLoading(false);
    //
    // const data = response.data;
    //
    // paginationStore.setPage(pageIndex, data.pagination.paginationPageCount);
    //
    // if (pageIndex === 1) {
    //   entityStore.setList(data.articles);
    // } else {
    //   entityStore.setList(entityStore.list.concat(data.articles));
    // }
  })
  .catch((error) => {
    console.error(error);
  });


const post = formData => FetchService.post('article', formData)
  .then((response) => {
    if (response.sc === 0) {
      AsyncStorage.removeItem('@ArticleStore');
      articleStore.title = '';
      articleStore.tags = '';
      articleStore.content = '';

    }
    Alert.alert(
        response.msg
      );
    return Promise.resolve(response.msg);
  })
  .catch((error) => {
    console.error(error);
  });

export default {
  getDetail,
  post
};
