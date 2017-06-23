import React, { Component, PropTypes } from 'react';
import {
  Button,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import userAction from '../../actions/User';

@inject('user')
@observer
class Navigation extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
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
    const { user } = this.props;

    return (
      <View>
        <Button
          onPress={this._logout}
          title={'登出'}
        />
      </View>);
  }
}

export default Navigation;
