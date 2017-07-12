import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Modal
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Login from '../../components/Login';
import ownerAction from '../../actions/Owner';
import { utils, module } from '../../styles';

@inject('owner')
@observer
class Navigation extends Component {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goView = async (routerName, pathname, stackTitle) => {
    const { owner } = this.props;
    const isLogin = await ownerAction.isLogin();
    if (!isLogin) {
      owner.setShowLogin(true);
    } else {
      this.props.navigation.navigate(routerName, {
        stackTitle,
        pathname
      });
    }
  };

  render() {
    const { owner } = this.props;
    return (
      <ScrollView style={[utils.statusBar, utils.flex]}>
        <Modal visible={owner.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', 'notifications/commented', '收到的回帖');
            }}
          >
            <Text>收到的回帖</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', 'notifications/reply', '收到的回复');
            }}
          >
            <Text>收到的回复</Text>
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
