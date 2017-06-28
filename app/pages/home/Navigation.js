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

@inject('user', 'entity')
@observer
class Navigation extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired
  };

  componentWillMount() {
    userAction.isLogin();
  }

  _goView = (routerName, pathname) => {
    const { user, entity } = this.props;
    userAction.isLogin().then((isLogin) => {
      if (isLogin) {
        entity.setPathname(pathname);
        this.props.navigation.navigate(routerName);
      } else {
        user.setShowLogin(true);
      }
    });
  };

  render() {
    const { user } = this.props;

    let loginButton = (<TouchableOpacity
      style={[module.list, module.listLast]}
      onPress={() => this.props.navigation.navigate('HomeSettingNavigation')}
    >
      <Text>设置</Text>
    </TouchableOpacity>);
    if (!user.isLogin) {
      loginButton = (<TouchableOpacity
        style={[module.list, module.listLast]}
        onPress={() => user.setShowLogin(true)}
      >
        <Text>登录</Text>
      </TouchableOpacity>);
    }
    return (
      <ScrollView style={utils.statusBar}>
        <Modal visible={user.showLogin}>
          <Login />
        </Modal>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('HomeArticles', `user/${user.name}/articles`);
            }}
          >
            <Text>帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>回帖[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>匿贴[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._goView}>
            <Text>匿回[开发中]</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('HomeArticles', `user/${user.name}/watching/articles`);
            }}
          >
            <Text>关注帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>关注用户[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>关注标签[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('HomeArticles', `user/${user.name}/following/articles`);
            }}
          >
            <Text>收藏帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._goView}>
            <Text>关注者[开发中]</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>积分[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._goView}>
            <Text>链接熔炉[开发中]</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          {loginButton}
        </View>
      </ScrollView>);
  }
}

export default Navigation;
