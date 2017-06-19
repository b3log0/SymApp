import {
  AsyncStorage
} from 'react-native';

import userStore from '../stores/User';

const isLogin = async () => {
  try {
    const userName = await AsyncStorage.getItem('@UserStore:name');
    if (userName !== null) {
      userStore.setName(userName);
      return true;
    }
    userStore.setName('');
    return false;
  } catch (error) {
    userStore.setName('');
    return false;
  }
};

export default {
  isLogin
};
