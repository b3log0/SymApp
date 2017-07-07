import color from '../common/color';

export default {
  normal: {
    borderBottomWidth: 0.5,
    borderBottomColor: color.fade,
    padding: 10,
    backgroundColor: color.white
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  rowFirst: {
    width: 50
  },
  rowCenter: {
    flex: 1
  },
  rowLast: {
    alignItems: 'flex-end',
    flex: 1
  },
  rowTitle: {
    paddingLeft: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  content: {
    fontSize: 14
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
    height: 100,
    marginBottom: 5
  }
};
