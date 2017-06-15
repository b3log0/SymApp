import color from '../common/color';

export default {
  normal: {
    borderBottomWidth: 0.5,
    borderBottomColor: color.fade,
    padding: 10,
    backgroundColor: color.white
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14
  },
  content: {
    fontSize: 12,
    color: color.gray
  },
  avatar: {
    borderRadius: 8,
    height: 16,
    width: 16
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5
  },
  infoText: {
    paddingLeft: 5,
    fontSize: 13,
    color: color.fade
  },
  thumbnailImg: {
    flex: 1,
    height: 100
  }
};
