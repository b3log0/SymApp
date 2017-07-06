import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';

import entity from './Entity';
import pagination from './Pagination';
import user from './User';
import article from './Article';
import home from './Home';
import domain from './Domain';
import tag from './Tag';

useStrict(true);
if (process.env.NODE_ENV === 'dev') {
  enableLogging({
    predicate: () => __DEV__ && Boolean(global.navigator.userAgent),
    action: true,
    reaction: true,
    transaction: true,
    compute: true
  });
}

export default {
  entity,
  pagination,
  user,
  article,
  home,
  domain,
  tag
};
