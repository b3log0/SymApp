import React, { Component, PropTypes } from 'react';
import {
  View,
  RefreshControl,
  ActivityIndicator,
  InteractionManager,
  VirtualizedList,
  Text
} from 'react-native';
import { inject, observer } from 'mobx-react';

import articlesAction from '../../actions/Articles';
import ListItem from './ListItem';
import LoadMoreFooter from '../../components/LoadMoreFooter';
import { utils } from '../../styles/index';

@inject('pagination', 'entity')
@observer
class List extends Component {

  static propTypes = {
    pagination: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { entity } = this.props;
    entity.setIsLoading(true);
    articlesAction.getList(1);
  }

  _onRefresh = () => {
    const { entity } = this.props;
    entity.setIsLoading(true);
    articlesAction.getList(1);
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
    articlesAction.getList(pagination.pageIndex + 1);
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
    const { entity } = this.props;
    if (entity.isLoading) {
      return (
        <View style={utils.statusBar}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
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
    );
  }
}

export default List;
