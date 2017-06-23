import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';

import entity from './Entity';
import pagination from './Pagination';
import user from './User';
import webView from './WebView';

useStrict(true);
if (process.env.NODE_ENV === 'dev') {
  enableLogging({
    predicate: () =>  true,
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
  webView
};
