import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  RefreshControl,
  VirtualizedList,
  ActivityIndicator,
  Text,
  InteractionManager,
  Button
} from 'react-native';
import { inject, observer } from 'mobx-react';

import LoadMoreFooter from '../../components/LoadMoreFooter';
import ListItem from '../../components/list/item/Item';
import userAction from '../../actions/User';
import homeAction from '../../actions/Home';
import Login from '../../components/Login';
import addfilePng from '../../images/addfile.png';
import { utils, home as homeStyle, icon } from '../../styles';

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
    const { home } = this.props;
    home.setIsLoading(true);
    homeAction.getIndex(1);

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
      this.props.navigation.navigate('MemberPost');
    } else {
      user.setShowLogin(true);
    }
  };

  _onRefresh = () => {
    const { home } = this.props;
    home.setIsLoading(true);
    homeAction.getIndex(1);
  };

  _toEnd = () => {
    const { home } = this.props;
    if (home.isLoading || home.pageIndex >= home.pageTotal) {
      return;
    }
    InteractionManager.runAfterInteractions(() => {
      this._loadMoreData();
    });
  };

  _loadMoreData = () => {
    const { home } = this.props;
    homeAction.getIndex(home.pageIndex + 1);
  };

  _renderFooter = () => {
    const { home } = this.props;
    if (home.isLoading) {
      return <Text style={utils.empty} />;
    }
    if (home.pageIndex < home.pageTotal) {
      return <LoadMoreFooter />;
    }
    return <LoadMoreFooter isLoadAll />;
  };

  _changeSort = (type) => {
    const { home } = this.props;
    home.setIsLoading(true);
    homeAction.getIndex(1);
  };

  render() {
    const { home } = this.props;
    let listJSX = (<VirtualizedList
      {...this._gestureHandlers}
      data={home.list}
      onEndReached={this._toEnd}
      onEndReachedThreshold={1}
      ListFooterComponent={this._renderFooter}
      enableEmptySections
      refreshControl={
        <RefreshControl
          refreshing={home.isLoading}
          onRefresh={this._onRefresh}
        />
      }
      keyExtractor={(item, i) => String(i)}
      getItemCount={items => items.length}
      getItem={(items, i) => items[i]}
      renderItem={rowData =>
        (<ListItem rowData={rowData.item} navigation={this.props.navigation} />)}
    />);
    if (home.isLoading) {
      listJSX = (
        <View style={utils.verticalCenter}>
          <ActivityIndicator />
        </View>
      );
    }

    const { user } = this.props;
    return (
      <View style={utils.statusBar}>
        <Modal visible={user.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        <View style={homeStyle.sort}>
          <Button title={'默认'} onPress={() => this._changeSort(0)} />
          <Button title={'热议'} onPress={() => this._changeSort(1)} />
          <Button title={'好评'} onPress={() => this._changeSort(2)} />
          <Button title={'最近评论'} onPress={() => this._changeSort(3)} />
        </View>
        {listJSX}
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
