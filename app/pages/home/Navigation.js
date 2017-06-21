import React, { Component, PropTypes } from 'react';
import {
  Button,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import userAction from '../../actions/User';
import Login from '../verify/Login';

@inject('user')
@observer
class Navigation extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  _logout = () => {
    userAction.logout();
  };

  render() {
    const { user } = this.props;

    if (user.isLogin) {
      return (<Login />);
    }

    return (
      <View>
        <Button
          onPress={() => this._logout}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}

export default Navigation;
