import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';

import owner from './Owner';
import article from './Article';
import domain from './Domain';
import notification from './Notification';

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
  domain,
  notification
};
