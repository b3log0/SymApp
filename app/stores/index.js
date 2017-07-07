import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';

import entity from './Entity';
import member from './Member';
import owner from './Owner';
import article from './Article';
import home from './Home';
import domain from './Domain';
import tag from './Tag';
import tags from './Tags';
import comments from './Comments';

useStrict(true);
if (process.env.NODE_ENV === 'dev') {
  enableLogging({
    predicate: () => __DEV__ && Boolean(global.navigator.userAgent),
    action: true,
    reaction: false,
    transaction: false,
    compute: false
  });
}

export default {
  entity,
  member,
  owner,
  article,
  home,
  domain,
  tag,
  tags,
  comments
};
