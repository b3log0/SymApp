import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Modal
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Login from '../../components/Login';
import userAction from '../../actions/User';
import { utils, module } from '../../styles';

@inject('owner', 'entity')
@observer
class Navigation extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    owner: PropTypes.object.isRequired
  };

  async componentWillMount() {
    await userAction.isLogin();
  }

  _goView = async (routerName, pathname, stackTitle) => {
    const { owner, entity } = this.props;
    const isLogin = await userAction.isLogin();
    if (isLogin) {
      entity.setPathname(pathname);
      this.props.navigation.navigate(routerName, { stackTitle });
    } else {
      owner.setShowLogin(true);
    }
  };

  render() {
    const { owner } = this.props;

    let loginButton = (<TouchableOpacity
      style={[module.list, module.listLast]}
      onPress={() => this.props.navigation.navigate('Setting')}
    >
      <Text>设置</Text>
    </TouchableOpacity>);
    if (!owner.isLogin) {
      loginButton = (<TouchableOpacity
        style={[module.list, module.listLast]}
        onPress={() => owner.setShowLogin(true)}
      >
        <Text>登录</Text>
      </TouchableOpacity>);
    }
    return (
      <ScrollView style={utils.statusBar}>
        <Modal visible={owner.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${owner.name}/articles`, '帖子');
            }}
          >
            <Text>帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${owner.name}/comments`, '回帖');
            }}
          >
            <Text>回帖</Text>
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
              this._goView('List', `user/${owner.name}/watching/articles`, '关注帖子');
            }}
          >
            <Text>关注帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${owner.name}/following/users`, '关注用户');
            }}
          >
            <Text>关注用户</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${owner.name}/following/tags`, '关注标签');
            }}
          >
            <Text>关注标签</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${owner.name}/following/articles`, '收藏帖子');
            }}
          >
            <Text>收藏帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => {
              this._goView('List', `user/${owner.name}/followers`, '关注者');
            }}
          >
            <Text>关注者</Text>
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
