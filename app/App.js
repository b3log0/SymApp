import React from 'react';
import { Provider } from 'mobx-react/native';

import Root from './router';
import store from './stores';

const SymApp = () => (
  <Provider {...store}>
    <Root />
  </Provider>
);

export default SymApp;
