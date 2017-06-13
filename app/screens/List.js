import React, {Component} from 'react';
import {
    Text,
    View,
    RefreshControl,
    ActivityIndicator,
    InteractionManager,
    ListView
} from 'react-native';

import articleList from '../styles/article-list'
import Article from '../actions/Articles';
import LoadMoreFooter from '../components/LoadMoreFooter'

class ListScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            articles: [],
            dataSource: [],
            pagination: {},
            currentPage: 1
        }
    };

    componentDidMount() {
        return Article.getList(this.state.currentPage).then((response) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(response.data.articles),
                pagination: response.data.pagination,
                articles:response.data.articles
            }, function () {
                // do something with new state
            });
        })
    };

    _onRefresh() {
        this.setState({ isLoading: true });
        Article.getList(1).then((response) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(response.data.articles),
                pagination: response.data.pagination,
                articles:response.data.articles
            }, function () {
                // do something with new state
            });
        })
    };

    _toEnd() {
        const { articles, isLoading, pagination } = this.state;
        //ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多
        if (isLoading || articles.length >  20 * pagination.paginationPageCount) {
            return;
        }
        InteractionManager.runAfterInteractions(() => {
            console.log("触发加载更多 toEnd() --> ");
            this._loadMoreData();
        });
    }

    _loadMoreData() {
        const { articles, currentPage } = this.state;
        Article.getList(currentPage + 1).then((response) => {
            console.log(articles.concat(response.data.articles));
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                dataSource: ds.cloneWithRows(articles.concat(response.data.articles)),
                pagination: response.data.pagination,
                articles:articles.concat(response.data.articles),
                currentPage: currentPage + 1
            }, function () {
                // do something with new state
            });
        })
    }

    _renderFooter() {
        const { articles, isLoading, pagination } = this.state;
        //通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
        if (articles.length < 1 || isLoading) {
            return null
        }

        if (articles.length < 20 * pagination.paginationPageCount) {
            //还有更多，默认显示‘正在加载更多...’
            return <LoadMoreFooter />
        } else {
            // 加载全部
            return <LoadMoreFooter isLoadAll={ true }/>
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <ListView
                    dataSource={ this.state.dataSource }
                    onEndReached={ this._toEnd.bind(this) }
                    onEndReachedThreshold={ 10 }
                    renderFooter={ this._renderFooter.bind(this) }
                    enableEmptySections={ true }
                    refreshControl={
                        <RefreshControl
                            refreshing={ this.state.isLoading }
                            onRefresh={ this._onRefresh.bind(this) }
                        />
                    }
                    renderRow={(rowData) =>
                        <View>
                            <Text style={{ height: 50 }}>{rowData.articleTitle}</Text>
                        </View>}
                />
            </View>
        );
    }
}

export default ListScreen;