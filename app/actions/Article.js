import { Alert, AsyncStorage } from 'react-native';

import articleStore from '../stores/Article';
import entityStore from '../stores/Entity';
import paginationStore from '../stores/Pagination';
import FetchService from '../services/FetchService';

const getDetail = async (pageIndex) => {
  try {
    const response = await FetchService.get(`article/${articleStore.oId}?p=${pageIndex}`);
    entityStore.setIsLoading(false);

    const data = response.data;
    paginationStore.setPage(pageIndex, data.pagination.paginationPageCount);


    if (pageIndex === 1) {
      entityStore.setList(data.article.articleComments);
    } else {
      entityStore.setList(entityStore.list.concat(data.article.articleComments));
    }

    articleStore.setTitle(data.article.articleTitle);
    articleStore.setContent(data.article.articleContent);
    articleStore.setTags(data.article.articleTagObjs);
  } catch (error) {
    console.error(error);
  }
};

const post = async (formData, navigation) => {
  try {
    const response = await FetchService.post('article', formData);
    if (response.sc === 0) {
      AsyncStorage.removeItem('@ArticleStore:title');
      AsyncStorage.removeItem('@ArticleStore:content');
      AsyncStorage.removeItem('@ArticleStore:tags');
      navigation.goBack();
    } else if (response.msg === '403') {
      Alert.alert('请重新登录', '',
        [
          {
            text: '登录',
            onPress: () => {
              AsyncStorage.removeItem('@UserStore:isLogin');
              navigation.goBack();
            }
          },
          { text: '取消' }
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        response.msg
      );
    }
    return Promise.resolve(response.sc);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export default {
  getDetail,
  post
};
