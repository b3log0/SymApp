import {
  AsyncStorage
} from 'react-native';

import userStore from '../stores/User';

const isLogin = async () => {
  try {
    const isLoginStorage = await AsyncStorage.getItem('@UserStore:isLogin');
    if (isLoginStorage !== null) {
      userStore.setIsLogin(true);
    }
    userStore.setIsLogin(false);
  } catch (error) {
    userStore.setIsLogin(false);
  }
};

export default {
  isLogin
};
