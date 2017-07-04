import color from './color';
import list from '../commponents/list';

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
    fontFamily: 'Menlo',
    borderColor: 'black',
    borderWidth: 1
  },
  code: {
    fontFamily: 'Menlo',
    fontSize: 12,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: color.fade,
    padding: 20
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
  p: Object.assign({}, list.content, { paddingBottom: 10, marginBottom: 10, flex: 1 })
};
