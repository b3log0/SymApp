import React, { Component, PropTypes } from 'react';
import {
  View,
  RefreshControl,
  ActivityIndicator,
  InteractionManager,
  ListView
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Articles from '../actions/Articles';
import LoadMoreFooter from '../components/LoadMoreFooter';
import ListItem from '../components/article/ListItem';
import { utils } from '../styles';

@inject('pagination', 'entity')
@observer
class List extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { entity } = this.props;
    entity.setIsLoading(true);
    Articles.getList(1);
  }

  _onRefresh() {
    const { entity } = this.props;
    entity.setIsLoading(true);
    Articles.getList(1);
  }

  _toEnd() {
    const { pagination, entity } = this.props;
    // ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多
    if (entity.isLoading || entity.length > 20 * pagination.pageTotal) {
      return;
    }
    InteractionManager.runAfterInteractions(() => {
      console.log('触发加载更多 toEnd() --> ');
      this._loadMoreData();
    });
  }

  _loadMoreData() {
    const { pagination } = this.props;
    Articles.getList(pagination.pageIndex + 1);
  }

  _renderFooter() {
    const { entity, pagination } = this.props;
    // 通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
    if (entity.length < 1 || entity.isLoading) {
      return null;
    }

    if (entity.length < 20 * pagination.pageTotal) {
      // 还有更多，默认显示‘正在加载更多...’
      return <LoadMoreFooter />;
    }
    // 加载全部
    return <LoadMoreFooter isLoadAll />;
  }

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
      <View style={utils.statusBar}>
        <ListView
          dataSource={entity.listDS}
          onEndReached={() => this._toEnd()}
          onEndReachedThreshold={10}
          renderFooter={() => this._renderFooter()}
          enableEmptySections
          refreshControl={
            <RefreshControl
              refreshing={entity.isLoading}
              onRefresh={() => this._onRefresh()}
            />
          }
          renderRow={rowData => (<ListItem rowData={rowData} navigation={this.props.navigation} />)}
        />
      </View>
    );
  }
}

export default List;
