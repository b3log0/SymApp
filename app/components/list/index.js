import React, { Component, PropTypes } from 'react';
import {
  RefreshControl,
  ActivityIndicator,
  InteractionManager,
  VirtualizedList
} from 'react-native';

import ListAction from '../../actions/List';
import ListItem from './item';
import LoadMoreFooter from '../LoadMoreFooter';
import { utils } from '../../styles/index';

class List extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired
  };

  componentWillMount() {
    ListAction.getList(1, this.props.entity);
  }

  _onRefresh = () => {
    ListAction.getList(1, this.props.entity);
  };

  _toEnd = () => {
    const { entity } = this.props;
    if (entity.isLoading || entity.pageIndex >= entity.pageTotal) {
      return;
    }
    InteractionManager.runAfterInteractions(() => {
      this._loadMoreData();
    });
  };

  _loadMoreData = () => {
    const { entity } = this.props;
    ListAction.getList(entity.pageIndex + 1, this.props.entity);
  };

  _renderFooter = () => {
    const { entity } = this.props;
    if (entity.isLoading) {
      return null;
    }
    if (entity.pageIndex < entity.pageTotal) {
      return <LoadMoreFooter />;
    }
    return <LoadMoreFooter isLoadAll />;
  };

  render() {
    const { entity } = this.props;
    if (entity.isLoading && entity.pageIndex < 1) {
      return (
        <ActivityIndicator style={utils.verticalCenter} />
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
