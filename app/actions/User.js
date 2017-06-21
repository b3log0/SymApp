import {
  AsyncStorage,
  Alert
} from 'react-native';
import md5 from 'blueimp-md5';

import userStore from '../stores/User';
import fetchService from '../services/FetchService';

const isLogin = async () => {
  try {
    const isLoginStorage = await AsyncStorage.getItem('@UserStore:isLogin');
    if (isLoginStorage !== null) {
      return userStore.setIsLogin(true);
    }
    return userStore.setIsLogin(false);
  } catch (error) {
    return userStore.setIsLogin(false);
  }
};

const login = (name, password) => {
  const formData = {
    userName: name,
    userPassword: md5(password)
    // "captcha": "" // 正常登录不用带该字段，登录失败次数过多时必填
  };
  fetchService.post('login', formData)
    .then((response) => {
      if (response.sc === 0) {
        AsyncStorage.setItem('@UserStore:isLogin', 'true', () => {
          userStore.setName(response.userName);
          userStore.setIsLogin(true);
        });
      } else {
        Alert.alert(
          response.msg
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const logout = () => {
  AsyncStorage.removeItem('@UserStore:isLogin', () => {
    userStore.setName('');
    userStore.setIsLogin(false);
  });
};

export default {
  isLogin,
  login,
  logout
};
