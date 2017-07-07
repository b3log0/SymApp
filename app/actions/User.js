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
    const nameStorage = await AsyncStorage.getItem('@UserStore:name');
    if (isLoginStorage !== null) {
      userStore.setIsLogin(true);
      userStore.setName(nameStorage);
      return true;
    }
    return false;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

const login = async (name, password) => {
  const formData = {
    userName: name,
    userPassword: md5(password)
    // "captcha": "" // 正常登录不用带该字段，登录失败次数过多时必填
  };

  try {
    const response = await fetchService.post('login', formData);
    if (response.sc === 0) {
      AsyncStorage.setItem('@UserStore:isLogin', 'true');
      AsyncStorage.setItem('@UserStore:name', response.userName);
      userStore.setName(response.userName);
      userStore.setIsLogin(true);
    } else {
      Alert.alert(
          response.msg
        );
    }

    return Promise.resolve(response.sc);
  } catch (error) {
    console.warn(error);
    return Promise.reject(error);
  }
};

const logout = async () => {
  try {
    const response = await fetchService.post('logout');
    if (response.sc === 0) {
      AsyncStorage.removeItem('@UserStore:isLogin');
      userStore.setIsLogin(false);
      userStore.setPassword('');
      userStore.setName('');
    } else {
      Alert.alert(
        response.msg
      );
    }
    return Promise.resolve(response.sc);
  } catch (error) {
    console.warn(error);
    return Promise.reject(error);
  }
};

export default {
  isLogin,
  login,
  logout
};
