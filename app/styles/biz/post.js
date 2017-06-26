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
  tags: {
    padding: 5,
    fontSize: 14,
    position: 'absolute',
    bottom: -200,
    height: 40
  },
  statusBar: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: color.fade,
    borderTopWidth: 0.5,
    borderTopColor: color.fade,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 48,
    justifyContent: 'center'
  },
  statusBarItem: {
    alignSelf: 'center',
    marginRight: 20
  },
  statusSwitch: {
    height: 20,
    width: 30
  }
};
