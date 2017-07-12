import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Button
} from 'react-native';
import { inject, observer } from 'mobx-react';

import List from '../../components/list';
import ownerAction from '../../actions/Owner';
import Login from '../../components/Login';
import addfilePng from '../../images/addfile.png';
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
          <Button title={'默认'} onPress={() => this._changeSort('')} />
          <Button title={'热议'} onPress={() => this._changeSort('/hot')} />
          <Button title={'好评'} onPress={() => this._changeSort('/good')} />
          <Button title={'最近评论'} onPress={() => this._changeSort('/reply')} />
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
