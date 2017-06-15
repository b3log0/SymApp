import React, { Component, PropTypes } from 'react';
import {
  View,
  RefreshControl,
  ActivityIndicator,
  InteractionManager,
  ListView
} from 'react-native';

import Article from '../actions/Articles';
import LoadMoreFooter from '../components/LoadMoreFooter';
import ListItem from '../components/article/ListItem';
import { utils } from '../styles';

class List extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      articles: [],
      dataSource: [],
      pagination: {},
      currentPage: 1
    };
  }

  componentDidMount() {
    return Article.getList(this.state.currentPage).then((response) => {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(response.data.articles),
        pagination: response.data.pagination,
        articles: response.data.articles
      }, () => {
        // do something with new state
      });
    });
  }

  _onRefresh() {
    this.setState({ isLoading: true });
    Article.getList(1).then((response) => {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(response.data.articles),
        pagination: response.data.pagination,
        articles: response.data.articles
      }, () => {
        // do something with new state
      });
    });
  }

  _toEnd() {
    const { articles, isLoading, pagination } = this.state;
    // ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多
    if (isLoading || articles.length > 20 * pagination.paginationPageCount) {
      return;
    }
    InteractionManager.runAfterInteractions(() => {
      console.log('触发加载更多 toEnd() --> ');
      this._loadMoreData();
    });
  }

  _loadMoreData() {
    const { articles, currentPage } = this.state;
    Article.getList(currentPage + 1).then((response) => {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(articles.concat(response.data.articles)),
        pagination: response.data.pagination,
        articles: articles.concat(response.data.articles),
        currentPage: currentPage + 1
      }, () => {
        // do something with new state
      });
    });
  }

  _renderFooter() {
    const { articles, isLoading, pagination } = this.state;
    // 通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
    if (articles.length < 1 || isLoading) {
      return null;
    }

    if (articles.length < 20 * pagination.paginationPageCount) {
      // 还有更多，默认显示‘正在加载更多...’
      return <LoadMoreFooter />;
    }
    // 加载全部
    return <LoadMoreFooter isLoadAll />;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={utils.statusBar}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={utils.statusBar}>
        <ListView
          dataSource={this.state.dataSource}
          onEndReached={() => this._toEnd()}
          onEndReachedThreshold={10}
          renderFooter={() => this._renderFooter()}
          enableEmptySections
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
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
