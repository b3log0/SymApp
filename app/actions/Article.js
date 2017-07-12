import { Alert, AsyncStorage } from 'react-native';

import articleStore from '../stores/Article';
import FetchService from '../services/FetchService';

const getDetail = async () => {
  try {
    const response = await FetchService.get(`article/update/${articleStore.oId}`);
    const article = response.data.article;

    articleStore.setForm({
      title: article.articleTitleEmojUnicode,
      content: article.articleContent,
      tags: article.articleTags,
      rewardContent: article.articleRewardContent,
      rewardPoint: article.articleRewardPoint === 0 ? '' : article.articleRewardPoint.toString()
    });
  } catch (error) {
    console.warn(error);
  }
};

const post = async (formData, navigation) => {
  try {
    const response = await FetchService.post('article', formData);
    if (response.sc === 0) {
      AsyncStorage.removeItem('@ArticleStore:title');
      AsyncStorage.removeItem('@ArticleStore:content');
      AsyncStorage.removeItem('@ArticleStore:tags');
      AsyncStorage.removeItem('@ArticleStore:rewardPoint');
      AsyncStorage.removeItem('@ArticleStore:rewardContent');
      navigation.goBack();
    } else {
      Alert.alert(response.msg);
    }
  } catch (error) {
    console.warn(error);
  }
};

const update = async (formData, navigation) => {
  try {
    const response = await FetchService.put(`article/${articleStore.oId}`, formData);
    if (response.sc === 0) {
      articleStore.clearForm();
      navigation.goBack();
    } else {
      Alert.alert(response.msg);
    }
  } catch (error) {
    console.warn(error);
  }
};

const comment = async () => {
  try {
    const formData =
      {
        articleId: articleStore.oId,
        commentContent: await AsyncStorage.getItem('@ArticleStore:comment'),
        commentOriginalCommentId: articleStore.commentOriginalCommentId // 可选，如果是回复则传入原回帖 id
      };

    const response = await FetchService.post('comment', formData);
    if (response.sc === 0) {
      articleStore.setCommentOriginalCommentId('');
      AsyncStorage.removeItem('@ArticleStore:comment');
      return Promise.resolve(true);
    }
    Alert.alert(response.msg);
    return null;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export default {
  getDetail,
  post,
  update,
  comment
};
