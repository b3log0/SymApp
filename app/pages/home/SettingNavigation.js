import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import userAction from '../../actions/User';
import { module } from '../../styles';

class SettingNavigation extends Component {

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
      <ScrollView>
        <View style={module.wrap}>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>基本信息[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>头像[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>密码[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._goView}>
            <Text>功能[开发中]</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>位置[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>隐私[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._goView}>
            <Text>数据[开发中]</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>邀请[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>积分[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>国际化[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._goView}>
            <Text>B3[开发中]</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._goView}>
            <Text>帮助[开发中]</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._logout}>
            <Text>登出</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default SettingNavigation;
