import { Dimensions } from 'react-native';

import color from '../common/color';

export default {
  content: {
    margin: 10
  },
  commentTitle: {
    fontSize: 16,
    margin: 10
  },
  commentSubmit: {
    flexDirection: 'row'
  },
  commentInput: {
    padding: 5,
    height: 40,
    fontSize: 16
  },
  commentInputWrap: {
    borderBottomWidth: 1,
    borderBottomColor: color.gray,
    flex: 1
  },
  webViewHidden: {
    position: 'absolute',
    left: 1000,
    width: Dimensions.get('window').width - 20
  }
};