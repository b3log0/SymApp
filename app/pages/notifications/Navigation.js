import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Modal
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Login from '../verify/Login';
import userAction from '../../actions/User';
import { utils, module } from '../../styles';

@inject('user')
@observer
class Navigation extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  _goView = async () => {
    const { user } = this.props;
    const isLogin = await userAction.isLogin();
    if (!isLogin) {
      user.setShowLogin(true);
    }
  };

  render() {
    const { user } = this.props;
    return (
      <ScrollView style={utils.statusBar}>
        <Modal visible={user.showLogin}>
          <Login />
        </Modal>
        <View style={module.wrap}>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>收到的回帖[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>收到的回复[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>提及我的[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._goView}>
            <Text>我关注的[开发中]</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>积分[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>同城[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._goView}>
            <Text>系统[开发中]</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default Navigation;
