import color from '../common/color';

export default {
  title: {
    padding: 5,
    height: 40,
    fontSize: 16
  },
  titleWrap: {
    borderBottomWidth: 1,
    borderBottomColor: color.gray
  },
  content: {
    padding: 5,
    height: 120,
    marginBottom: 10,
    fontSize: 14
  },
  statusBar: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: color.fade,
    borderTopWidth: 0.5,
    borderTopColor: color.fade,
    flexDirection: 'row',
    width: '100%',
    height: 48,
    justifyContent: 'flex-end'
  },
  statusBarItem: {
    alignSelf: 'center',
    marginRight: 20
  },
  button: {
    paddingTop: 5
  },
  tagBtn: {
    position: 'absolute',
    bottom: 0
  }
};
