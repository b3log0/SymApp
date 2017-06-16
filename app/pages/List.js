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

@inject('pagination', 'articles')
@observer
class List extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { pagination, articles } = this.props;
    articles.setIsLoading(true);
    Articles.getList(pagination.pageIndex + 1);
  }

  _onRefresh() {
    this.setState({ isLoading: true });
    const { pagination } = this.props;
    Articles.getList(pagination.pageIndex + 1);
  }

  _toEnd() {
    const { pagination, articles } = this.props;
    // ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多
    if (articles.isLoading || articles.length > 20 * pagination.pageTotal) {
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
    const { articles, pagination } = this.props;
    // 通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
    if (articles.length < 1 || articles.isLoading) {
      return null;
    }

    if (articles.length < 20 * pagination.pageTotal) {
      // 还有更多，默认显示‘正在加载更多...’
      return <LoadMoreFooter />;
    }
    // 加载全部
    return <LoadMoreFooter isLoadAll />;
  }

  render() {
    const { articles } = this.props;
    if (articles.isLoading) {
      return (
        <View style={utils.statusBar}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={utils.statusBar}>
        <ListView
          dataSource={articles.listDS}
          onEndReached={() => this._toEnd()}
          onEndReachedThreshold={10}
          renderFooter={() => this._renderFooter()}
          enableEmptySections
          refreshControl={
            <RefreshControl
              refreshing={articles.isLoading}
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
