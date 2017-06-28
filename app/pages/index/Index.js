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
import ListItem from '../../components/article/ListItem';
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

  componentWillMount() {
    const { indexList } = this.props;
    indexList.setIsLoading(true);
    articlesAction.getIndex(1);
  }

  _goPost = () => {
    const { user } = this.props;
    userAction.isLogin().then((isLogin) => {
      if (isLogin) {
        this.props.navigation.navigate('IndexPost');
      } else {
        user.setShowLogin(true);
      }
    });
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
        <View style={utils.statusBar}>
          <ActivityIndicator />
        </View>
      );
    }

    const { user } = this.props;
    return (
      <View style={utils.statusBar}>
        <Modal visible={user.showLogin}>
          <Login />
        </Modal>
        <VirtualizedList
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
        <TouchableOpacity
          onPress={this._goPost}
          style={index.addIconWrap}
        >
          <View >
            <Image style={[index.addIcon, icon.normal]} source={addfilePng} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Index;
