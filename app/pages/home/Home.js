import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  InteractionManager,
  Text
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Notification from '../../components/Notification';
import List from '../../components/list';
import ownerAction from '../../actions/Owner';
import notificationAction from '../../actions/Notification';
import Login from '../../components/Login';
import addfilePng from '../../images/addfile.png';
import { notificationDuration } from '../../config/symphony';
import { utils, home as homeStyle, icon, common } from '../../styles';

@inject('owner')
@observer
class Index extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    owner: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      pageYs: [],
      isHidden: false,
      pathname: 'articles/latest'
    };
  }

  async componentDidMount() {
    const isLogin = await ownerAction.isLogin();
    if (isLogin) {
      notificationAction.getCntx();
      this._notificationTimer = setInterval(
      () => {
        InteractionManager.runAfterInteractions(async () => {
          const response = await notificationAction.getCntx();
          Notification.setApplicationIconBadgeNumber(response.unreadNotificationCnt);
          if (response.unreadNotificationCnt === 0) {
            return;
          }
          Notification.localNotification({
            id: '1',
            title: '黑客派',
            message: `你有 ${response.unreadNotificationCnt} 条新消息`
          });
        });
      },
      notificationDuration
    );
    }
  }

  componentWillUnmount() {
    if (this._notificationTimer) {
      clearTimeout(this._notificationTimer);
    }
  }

  // 向下滚动时隐藏发帖按钮
  _gestureHandlers = {
    onStartShouldSetResponder: () => true,
    onResponderGrant: () => {
      this.setState({ pageYs: [] });
    },
    onResponderMove: (evt) => {
      this.state.pageYs.push(evt.nativeEvent.pageY);
      if (this.state.pageYs[0] - evt.nativeEvent.pageY > 20) {
        this.setState({ isHidden: true });
      } else if (evt.nativeEvent.pageY - this.state.pageYs[0] > 10) {
        this.setState({ isHidden: false });
      } else {
        this.setState({ isHidden: null });
      }
    }
  };

  _goPost = async () => {
    const { owner } = this.props;
    const isLogin = await ownerAction.isLogin();
    if (isLogin) {
      this.props.navigation.navigate('MemberPost', { stackTitle: '发帖' });
    } else {
      owner.setShowLogin(true);
    }
  };

  _changeSort = (type) => {
    this.setState({
      pathname: `articles/latest${type}`
    });
  };

  render() {
    const { owner } = this.props;
    return (
      <View style={[utils.statusBar, utils.flex]}>
        <Modal visible={owner.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        <View style={common.sort}>
          <TouchableOpacity
            style={[
              common.sortItem,
              this.state.pathname === 'articles/latest' ? common.sortItemTextCurrent : ''
            ]}
            onPress={() => this._changeSort('')}
          >
            <Text style={common.sortItemText}>默认</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              common.sortItem,
              this.state.pathname === 'articles/latest/hot' ? common.sortItemTextCurrent : ''
            ]}
            onPress={() => this._changeSort('/hot')}
          >
            <Text style={common.sortItemText}>热议</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              common.sortItem,
              this.state.pathname === 'articles/latest/good' ? common.sortItemTextCurrent : ''
            ]}
            onPress={() => this._changeSort('/good')}
          >
            <Text style={common.sortItemText}>好评</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              common.sortItem,
              this.state.pathname === 'articles/latest/reply' ? common.sortItemTextCurrent : ''
            ]}
            onPress={() => this._changeSort('/reply')}
          >
            <Text style={common.sortItemText}>最近回帖</Text>
          </TouchableOpacity>
        </View>
        <List
          pathname={this.state.pathname}
          navigation={this.props.navigation}
          {...this._gestureHandlers}
        />
        {
          this.state.isHidden === false ? (<TouchableOpacity
            onPress={this._goPost}
            style={homeStyle.addIconWrap}
          >
            <View >
              <Image style={[homeStyle.addIcon, icon.normal]} source={addfilePng} />
            </View>
          </TouchableOpacity>) : null
        }
      </View>
    );
  }
}

export default Index;
