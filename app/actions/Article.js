import { Alert, AsyncStorage } from 'react-native';

import articleStore from '../stores/Article';
import commentsStore from '../stores/Comments';
import FetchService from '../services/FetchService';

const getDetail = async (pageIndex) => {
  try {
    commentsStore.setIsLoading(true);
    const response = await FetchService.get(`article/${articleStore.oId}?p=${pageIndex}`);
    const data = response.data;
    commentsStore.setPage(pageIndex, data.pagination.paginationPageCount);

    if (pageIndex === 1) {
      commentsStore.setList(data.article.articleComments);
    } else {
      commentsStore.setList(commentsStore.list.concat(data.article.articleComments));
    }

    articleStore.setType(data.article.articleType);
    articleStore.setTitle(data.article.articleTitle);
    articleStore.setContent(data.article.articleContent);
    articleStore.setTagObjs(data.article.articleTagObjs);
    articleStore.setTags(data.article.articleTags);
    articleStore.setAuthorName(data.article.articleAuthorName);

    commentsStore.setIsLoading(false);
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
      articleStore.setTitle(formData.articleTitle);
      articleStore.setContent(formData.articleContent);
      articleStore.setTags(formData.articleTags);
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
