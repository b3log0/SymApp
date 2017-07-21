import color from './color';

export default {
  sort: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sortItem: {
    backgroundColor: color.black,
    flex: 1
  },
  sortItemText: {
    color: color.white,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  sortItemTextCurrent: {
    borderBottomWidth: 2,
    borderBottomColor: color.red
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
  },
  statusBarBtn: {
    marginTop: 5,
    marginRight: 5
  }
};
