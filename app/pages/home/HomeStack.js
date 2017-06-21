import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import User from '../../actions/User';
import HomeNavigation from './Navigation';
import Login from '../verify/Login';

@inject('user')
@observer
class HomeStack extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  componentDidMount() {
    User.isLogin();
  }

  render() {
    const { user } = this.props;
    if (user.isLogin) {
      return (<HomeNavigation />);
    }
    return (<Login />);
  }
}

export default HomeStack;
