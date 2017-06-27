import React, { Component, PropTypes } from 'react';
import {
  View,
  RefreshControl,
  ActivityIndicator,
  InteractionManager,
  VirtualizedList,
  Text,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import { inject, observer } from 'mobx-react';

import userAction from '../../actions/User';
import Articles from '../../actions/Articles';
import Login from '../verify/Login';
import LoadMoreFooter from '../../components/LoadMoreFooter';
import ListItem from '../../components/article/ListItem';
import addfilePng from '../../images/addfile.png';
import { utils, index, icon } from '../../styles/index';

@inject('pagination', 'entity', 'user')
@observer
class Index extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { entity } = this.props;
    entity.setIsLoading(true);
    Articles.getList(1);
  }

  _onRefresh = () => {
    const { entity } = this.props;
    entity.setIsLoading(true);
    Articles.getList(1);
  };

  _toEnd = () => {
    const { pagination, entity } = this.props;
    if (entity.isLoading || pagination.pageIndex >= pagination.pageTotal) {
      return;
    }
    InteractionManager.runAfterInteractions(() => {
      this._loadMoreData();
    });
  };

  _loadMoreData = () => {
    const { pagination } = this.props;
    Articles.getList(pagination.pageIndex + 1);
  };

  _renderFooter = () => {
    const { entity, pagination } = this.props;
    if (entity.isLoading) {
      return <Text style={utils.empty} />;
    }
    if (pagination.pageIndex < pagination.pageTotal) {
      return <LoadMoreFooter />;
    }
    return <LoadMoreFooter isLoadAll />;
  };

  render() {
    const { entity, user } = this.props;
    if (entity.isLoading) {
      return (
        <View style={utils.statusBar}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={utils.statusBar}>
        <Modal visible={user.showLogin}>
          <Login noCancel={false} />
        </Modal>
        <VirtualizedList
          data={entity.list}
          onEndReached={this._toEnd}
          onEndReachedThreshold={1}
          ListFooterComponent={this._renderFooter}
          enableEmptySections
          refreshControl={
            <RefreshControl
              refreshing={entity.isLoading}
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
          onPress={() => {
            userAction.isLogin().then((isLogin) => {
              if (isLogin) {
                this.props.navigation.navigate('Post');
              } else {
                user.setShowLogin(true);
              }
            });
          }}
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
