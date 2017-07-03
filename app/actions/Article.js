import { Alert, AsyncStorage } from 'react-native';

import FetchService from '../services/FetchService';
import articleStore from '../stores/Article';

const getDetail = async (pageIndex) => {
  try {
    const response = await FetchService.get(pageIndex);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

const post = async (formData) => {
  try {
    const response = await FetchService.post('article', formData);
    if (response.sc === 0) {
      AsyncStorage.removeItem('@ArticleStore:title');
      AsyncStorage.removeItem('@ArticleStore:content');
      AsyncStorage.removeItem('@ArticleStore:tags');
      articleStore.setContent('');
      articleStore.setTags('');
      articleStore.setTitle('');
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
