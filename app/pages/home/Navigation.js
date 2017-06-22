import React, { Component, PropTypes } from 'react';
import {
  Button,
  View
} from 'react-native';

import userAction from '../../actions/User';

class Navigation extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  componentWillMount() {
    userAction.isLogin().then((isLogin) => {
      if (!isLogin) {
        this.props.navigation.navigate('Login');
      }
    });
  }

  _logout = () => {
    userAction.logout().then((sc) => {
      if (sc === 0) {
        this.props.navigation.navigate('Login');
      }
    });
  };

  render() {
    return (
      <View>
        <Button
          onPress={this._logout}
          title="Logout"
        />
      </View>);
  }
}

export default Navigation;
