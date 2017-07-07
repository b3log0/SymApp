import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Modal,
  Image
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Login from '../../components/Login';
import ownerAction from '../../actions/Owner';
import memberAction from '../../actions/Member';
import logoPng from '../../images/logo.png';
import { utils, module, member as memberStyle, common } from '../../styles';

@inject('owner', 'entity', 'member')
@observer
class Navigation extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired,
    owner: PropTypes.object.isRequired
  };

  async componentWillMount() {
    await ownerAction.isLogin();

    memberAction.getDetail();
  }

  _goView = async (routerName, pathname, stackTitle) => {
    const { owner, entity } = this.props;
    const isLogin = await ownerAction.isLogin();
    if (isLogin) {
      entity.setPathname(pathname);
      this.props.navigation.navigate(routerName, { stackTitle });
    } else {
      owner.setShowLogin(true);
    }
  };

  render() {
    const { owner, member } = this.props;

    console.log(member.isLoading, member.avatarURL);

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
        <View style={memberStyle.infoWrap}>
          {
            member.avatarURL === '' ?
              <Image
                style={common.avatarBigger}
                source={logoPng}
              /> : <Image style={common.avatarBigger} source={{ uri: member.avatarURL }} />
          }
          <View style={utils.flex}>
            <Text style={[memberStyle.introText, memberStyle.introName]}>
              {member.name === '' ? owner.name : member.name}
            </Text>
            <Text style={memberStyle.introText}>{member.intro}</Text>
          </View>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${member.name}/articles`, '帖子');
            }}
          >
            <Text>帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${member.name}/comments`, '回帖');
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
              this._goView('List', `user/${member.name}/watching/articles`, '关注帖子');
            }}
          >
            <Text>关注帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${member.name}/following/users`, '关注用户');
            }}
          >
            <Text>关注用户</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${member.name}/following/tags`, '关注标签');
            }}
          >
            <Text>关注标签</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${member.name}/following/articles`, '收藏帖子');
            }}
          >
            <Text>收藏帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => {
              this._goView('List', `user/${member.name}/followers`, '关注者');
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
