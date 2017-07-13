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
            <Text style={{ color: color.red }}>
              {notification.unreadCommentedNotificationCnt}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, utils.rowSpaceBetween]}
            onPress={() => {
              this._goView('List', 'notifications/reply', '收到的回复');
            }}
          >
            <Text>收到的回复</Text>
            <Text style={{ color: color.red }}>
              {notification.unreadReplyNotificationCnt}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, utils.rowSpaceBetween]} onPress={this._goView}>
            <Text>提及我的[开发中]</Text>
            <Text style={{ color: color.red }}>
              {notification.unreadAtNotificationCnt}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast, utils.rowSpaceBetween]}
            onPress={this._goView}
          >
            <Text>我关注的[开发中]</Text>
            <Text style={{ color: color.red }}>
              {notification.unreadFollowingNotificationCnt}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity style={[module.list, utils.rowSpaceBetween]} onPress={this._goView}>
            <Text>积分[开发中]</Text>
            <Text style={{ color: color.red }}>
              {notification.unreadPointNotificationCnt}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[module.list, utils.rowSpaceBetween]} onPress={this._goView}>
            <Text>同城[开发中]</Text>
            <Text style={{ color: color.red }}>
              {notification.unreadBroadcastNotificationCnt}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast, utils.rowSpaceBetween]}
            onPress={this._goView}
          >
            <Text>系统[开发中]</Text>
            <Text style={{ color: color.red }}>
              {notification.unreadSysAnnounceNotificationCnt}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default Navigation;
