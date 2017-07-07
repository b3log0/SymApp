import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Modal,
  Image,
  Button
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationActions } from 'react-navigation';

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

  static navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.params && !navigation.state.params.isOwner) {
      tabBarVisible = false;
    }
    return {
      header: null,
      tabBarVisible
    };
  };

  constructor(props) {
    super(props);
    const { owner, member } = this.props;
    this.state = {
      isOwner: owner.name === member.name
    };
  }

  async componentWillMount() {
    await ownerAction.isLogin();
    const { owner, member } = this.props;
    this.setState({
      isOwner: owner.name === member.name || member.name === ''
    });

    memberAction.getDetail(this.state.isOwner ? owner.name : member.name);
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

  _goMember = () => {
    const { member } = this.props;
    member.setName('');
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Member' })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const { owner, member } = this.props;
    const name = this.state.isOwner ? owner.name : member.name;
    const intro = this.state.isOwner ? owner.intro : member.intro;
    let avatarURL = this.state.isOwner ? owner.avatarURL : member.avatarURL;
    if (avatarURL === '') {
      avatarURL = logoPng;
    } else {
      avatarURL = { uri: avatarURL };
    }

    let loginButton = <Button title={'返回'} onPress={this._goMember} />;

    if (this.state.isOwner) {
      loginButton = (<View style={module.wrap}><TouchableOpacity
        style={[module.list, module.listLast]}
        onPress={() => this.props.navigation.navigate('Setting')}
      >
        <Text>设置</Text>
      </TouchableOpacity></View>);

      if (!owner.isLogin) {
        loginButton = (<View style={module.wrap}><TouchableOpacity
          style={[module.list, module.listLast]}
          onPress={() => owner.setShowLogin(true)}
        >
          <Text>登录</Text>
        </TouchableOpacity></View>);
      }
    }

    return (
      <ScrollView style={utils.statusBar}>
        <Modal visible={owner.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        <View style={memberStyle.infoWrap}>
          <Image style={common.avatarBigger} source={avatarURL} />
          <View style={utils.flex}>
            <Text style={[memberStyle.introText, memberStyle.introName]}>
              {name}
            </Text>
            <Text style={memberStyle.introText}>{intro}</Text>
          </View>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${name}/articles`, '帖子');
            }}
          >
            <Text>帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${name}/comments`, '回帖');
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
              this._goView('List', `user/${name}/watching/articles`, '关注帖子');
            }}
          >
            <Text>关注帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${name}/following/users`, '关注用户');
            }}
          >
            <Text>关注用户</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${name}/following/tags`, '关注标签');
            }}
          >
            <Text>关注标签</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView('List', `user/${name}/following/articles`, '收藏帖子');
            }}
          >
            <Text>收藏帖子</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => {
              this._goView('List', `user/${name}/followers`, '关注者');
            }}
          >
            <Text>关注者</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity style={module.list} >
            <Text>积分[开发中]</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, module.listLast]}>
            <Text>链接熔炉[开发中]</Text>
          </TouchableOpacity>
        </View>
        {loginButton}
      </ScrollView>);
  }
}

export default Navigation;
