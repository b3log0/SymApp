import React, { Component } from 'react';
import { Provider } from 'mobx-react/native';
import JPushModule from 'jpush-react-native';

import Root from './router';
import store from './stores';


class SymApp extends Component {
  componentDidMount() {
    // JPushModule.notifyJSDidLoad();
    // JPushModule.addReceiveCustomMsgListener((message) => {
    //   this.setState({ pushMsg: message });
    // });
    JPushModule.addReceiveNotificationListener((message) => {
      console.log(`receive notification: ${message}`);
    });
  }

  componentWillUnmount() {
    // JPushModule.removeReceiveCustomMsgListener();
    JPushModule.removeReceiveNotificationListener();
  }
  render() {
    return (
      <Provider {...store}>
        <Root />
      </Provider>
    );
  }
}

export default SymApp;
