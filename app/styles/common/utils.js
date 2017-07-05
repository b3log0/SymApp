import { Platform } from 'react-native';

import color from './color';

export default {
  statusBar: {
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    flex: 1
  },
  empty: {
    height: 0
  },
  flex: {
    flex: 1
  },
  verticalCenter: {
    flex: 1,
    justifyContent: 'center',
    height: '100%'
  },
  content: {
    fontSize: 14,
    color: color.gray
  }
};
