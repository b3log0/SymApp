import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Button
} from 'react-native';
import { inject, observer } from 'mobx-react';

import List from '../../components/list';
import userAction from '../../actions/User';
import ListAction from '../../actions/List';
import Login from '../../components/Login';
import addfilePng from '../../images/addfile.png';
import { utils, home as homeStyle, icon, common } from '../../styles';

@inject('home', 'user')
@observer
class Index extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      pageYs: [],
      isHidden: false
    };
  }

  componentWillMount() {
    // 向下滚动时隐藏发帖按钮
    this._gestureHandlers = {
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
  }

  _goPost = async () => {
    const { user } = this.props;
    const isLogin = await userAction.isLogin();
    if (isLogin) {
      this.props.navigation.navigate('MemberPost', { stackTitle: '发帖' });
    } else {
      user.setShowLogin(true);
    }
  };

  _changeSort = (type) => {
    const { home } = this.props;
    home.clearAndSetPathname(`articles/latest${type}`);
    ListAction.getList(1, home);
  };

  render() {
    const { home, user } = this.props;
    // for observer, don't remove!!!
    console.log(home.isLoading);

    return (
      <View style={utils.statusBar}>
        <Modal visible={user.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        <View style={common.sort}>
          <Button title={'默认'} onPress={() => this._changeSort('')} />
          <Button title={'热议'} onPress={() => this._changeSort('/hot')} />
          <Button title={'好评'} onPress={() => this._changeSort('/good')} />
          <Button title={'最近评论'} onPress={() => this._changeSort('/reply')} />
        </View>
        <List entity={home} navigation={this.props.navigation} {...this._gestureHandlers} />
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
