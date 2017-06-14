import { Platform } from 'react-native';

const statusBar = {
  paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  flex: 1
};

export default {
  statusBar
};
