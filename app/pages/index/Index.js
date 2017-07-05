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
  InteractionManager
} from 'react-native';
import { inject, observer } from 'mobx-react';

import LoadMoreFooter from '../../components/LoadMoreFooter';
import ListItem from '../../components/list/item/Item';
import userAction from '../../actions/User';
import articlesAction from '../../actions/Articles';
import Login from '../verify/Login';
import addfilePng from '../../images/addfile.png';
import { utils, index, icon } from '../../styles/index';

@inject('indexList', 'user')
@observer
class Index extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    indexList: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      pageYs: [],
      isHidden: false
    };
  }

  componentWillMount() {
    const { indexList } = this.props;
    indexList.setIsLoading(true);
    articlesAction.getIndex(1);

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
      this.props.navigation.navigate('IndexPost');
    } else {
      user.setShowLogin(true);
    }
  };

  _onRefresh = () => {
    const { indexList } = this.props;
    indexList.setIsLoading(true);
    articlesAction.getIndex(1);
  };

  _toEnd = () => {
    const { indexList } = this.props;
    if (indexList.isLoading || indexList.pageIndex >= indexList.pageTotal) {
      return;
    }
    InteractionManager.runAfterInteractions(() => {
      this._loadMoreData();
    });
  };

  _loadMoreData = () => {
    const { indexList } = this.props;
    articlesAction.getIndex(indexList.pageIndex + 1);
  };

  _renderFooter = () => {
    const { indexList } = this.props;
    if (indexList.isLoading) {
      return <Text style={utils.empty} />;
    }
    if (indexList.pageIndex < indexList.pageTotal) {
      return <LoadMoreFooter />;
    }
    return <LoadMoreFooter isLoadAll />;
  };

  render() {
    const { indexList } = this.props;
    if (indexList.isLoading) {
      return (
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
        <VirtualizedList
          {...this._gestureHandlers}
          data={indexList.list}
          onEndReached={this._toEnd}
          onEndReachedThreshold={1}
          ListFooterComponent={this._renderFooter}
          enableEmptySections
          refreshControl={
            <RefreshControl
              refreshing={indexList.isLoading}
              onRefresh={this._onRefresh}
            />
          }
          keyExtractor={(item, i) => String(i)}
          getItemCount={items => items.length}
          getItem={(items, i) => items[i]}
          renderItem={rowData =>
            (<ListItem rowData={rowData.item} navigation={this.props.navigation} />)}
        />
        {
          this.state.isHidden === false ? (<TouchableOpacity
            onPress={this._goPost}
            style={index.addIconWrap}
          >
            <View >
              <Image style={[index.addIcon, icon.normal]} source={addfilePng} />
            </View>
          </TouchableOpacity>) : null
        }
      </View>
    );
  }
}

export default Index;
