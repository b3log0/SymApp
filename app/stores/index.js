import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';

import owner from './Owner';
import article from './Article';
import home from './Home';
import domain from './Domain';
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
  owner,
  article,
  home,
  domain,
  comments
};
