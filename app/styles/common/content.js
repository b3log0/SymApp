import { Platform, Dimensions } from 'react-native';

import color from './color';

const { width } = Dimensions.get('window');

export default {
  b: {
    fontWeight: '500'
  },
  strong: {
    fontWeight: '500'
  },
  i: {
    fontStyle: 'italic'
  },
  em: {
    fontStyle: 'italic'
  },
  pre: {
    marginTop: 10
  },
  code: {
    fontFamily: 'Menlo',
    fontSize: 12,
    color: color.gray
  },
  blockquote: {
    borderLeftColor: color.fade,
    borderLeftWidth: 5,
    paddingLeft: 5,
    marginBottom: 5
  },
  a: {
    fontWeight: '500',
    color: color.blue
  },
  h1: {
    fontWeight: '500',
    fontSize: 36
  },
  h2: {
    fontWeight: '500',
    fontSize: 30
  },
  h3: {
    fontWeight: '500',
    fontSize: 24
  },
  h4: {
    fontWeight: '500',
    fontSize: 18
  },
  h5: {
    fontWeight: '500',
    fontSize: 14
  },
  h6: {
    fontWeight: '500',
    fontSize: 12
  },
  p: {
    fontSize: 14
  },
  ...Platform.select({
    ios: {
      backgroundColor: 'red'
    },
    android: {
      backgroundColor: 'blue'
    }
  }),
  emoji: {
    ...Platform.select({
      ios: {
        height: 14,
        width: 14,
        marginTop: 2
      },
      android: {
        height: 22,
        width: 22
      }
    })
  },
  img: {
    marginBottom: 5,
    marginTop: 5,
    flex: 1,
    height: 100,
    width: width - 20
  }
};
