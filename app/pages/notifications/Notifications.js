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

import Notification from '../../components/Notification';
import Login from '../../components/Login';
import ownerAction from '../../actions/Owner';
import { utils, module, color } from '../../styles';

@inject('owner', 'notification')
@observer
class Navigation extends Component {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
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
    // clear icon badge number
    Notification.setApplicationIconBadgeNumber(0);

    const { owner, notification } = this.props;
    return (
      <ScrollView style={[utils.statusBar, utils.flex]}>
        <Modal visible={owner.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        <View style={module.wrap}>
          <TouchableOpacity
            style={[module.list, utils.rowSpaceBetween]}
            onPress={() => {
              this._goView('List', 'notifications/commented', '收到的回帖');
            }}
          >
            <Text>收到的回帖</Text>
            {
              notification.unreadCommentedNotificationCnt === 0 ? null :
              <Text style={{ color: color.red }}>
                {notification.unreadCommentedNotificationCnt}
              </Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, utils.rowSpaceBetween]}
            onPress={() => {
              this._goView('List', 'notifications/reply', '收到的回复');
            }}
          >
            <Text>收到的回复</Text>
            {
              notification.unreadReplyNotificationCnt === 0 ? null :
              <Text style={{ color: color.red }}>
                {notification.unreadReplyNotificationCnt}
              </Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, utils.rowSpaceBetween]}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'notifications/at',
                injectJS: `$('body').html($('.content').html()).addClass('content list');
                $('html').css({
                  'background-color': '#fff'
                });`,
                stackTitle: '提及我的'
              });
            }}
          >
            <Text>提及我的</Text>
            {
              notification.unreadAtNotificationCnt === 0 ? null :
              <Text style={{ color: color.red }}>
                {notification.unreadAtNotificationCnt}
              </Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast, utils.rowSpaceBetween]}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'notifications/following',
                injectJS: `$('body').html($('.content').html()).addClass('content list');
                $('html').css({
                  'background-color': '#fff'
                });`,
                stackTitle: '我关注的'
              });
            }}
          >
            <Text>我关注的</Text>
            {
              notification.unreadFollowingNotificationCnt === 0 ? null :
              <Text style={{ color: color.red }}>
                {notification.unreadFollowingNotificationCnt}
              </Text>
            }
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity
            style={[module.list, utils.rowSpaceBetween]}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'notifications/point',
                injectJS: `$('body').html($('.content').html()).addClass('content list');
                $('html').css({
                  'background-color': '#fff'
                });`,
                stackTitle: '积分'
              });
            }}
          >
            <Text>积分</Text>
            {
              notification.unreadPointNotificationCnt === 0 ? null :
              <Text style={{ color: color.red }}>
                {notification.unreadPointNotificationCnt}
              </Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, utils.rowSpaceBetween]}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'notifications/broadcast',
                injectJS: `$('body').html($('.content').html()).addClass('content list');
                $('html').css({
                  'background-color': '#fff'
                });`,
                stackTitle: '同城'
              });
            }}
          >
            <Text>同城</Text>
            {
              notification.unreadBroadcastNotificationCnt === 0 ? null :
              <Text style={{ color: color.red }}>
                {notification.unreadBroadcastNotificationCnt}
              </Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, utils.rowSpaceBetween]}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'notifications/sys-announce',
                injectJS: `$('body').html($('.content').html()).addClass('content list');
                $('html').css({
                  'background-color': '#fff'
                });`,
                stackTitle: '系统'
              });
            }}
          >
            <Text>系统</Text>
            {
              notification.unreadSysAnnounceNotificationCnt === 0 ? null :
              <Text style={{ color: color.red }}>
                {notification.unreadSysAnnounceNotificationCnt}
              </Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast, utils.rowSpaceBetween]}
            onPress={() => {
              this._goView('List', `user/${owner.name}/followers`, '关注者');
            }}
          >
            <Text>新增关注者</Text>
            {
              notification.unreadNewFollowerNotificationCnt === 0 ? null :
              <Text style={{ color: color.red }}>
                {notification.unreadNewFollowerNotificationCnt}
              </Text>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default Navigation;
