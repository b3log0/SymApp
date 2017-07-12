import color from './color';

export default {
  sort: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  avatar: {
    borderRadius: 8,
    height: 16,
    width: 16
  },
  avatarBig: {
    height: 36,
    width: 36,
    borderRadius: 18
  },
  avatarBigger: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  statusBar: {
    backgroundColor: color.fade,
    borderTopWidth: 0.5,
    borderTopColor: color.fade,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'flex-end'
  },
  statusBarItem: {
    alignSelf: 'center',
    marginRight: 20
  }
};
