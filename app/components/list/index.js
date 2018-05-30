import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RefreshControl,
  ActivityIndicator,
  InteractionManager,
  VirtualizedList
} from 'react-native';

import ListAction from '../../actions/List';
import ListItem from './item';
import LoadMoreFooter from '../LoadMoreFooter';
import { utils } from '../../styles';

class List extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    reload: PropTypes.boolean
  };

  static defaultProps = {
    reload: false
  };

  constructor(props) {
    super(props);

    this.state = {
      pageTotal: 0,
      pageIndex: 0,
      isLoading: true,
      list: []
    };
  }

  async componentWillMount() {
    const response = await ListAction.getList(1, this.props.pathname);
    this.setState({
      pageIndex: 1,
      pageTotal: response.pageTotal,
      list: response.list,
      isLoading: false
    });
  }

  async componentWillReceiveProps(nextProps) {
    let reload = false;
    if (typeof nextProps.reload !== 'undefined' && nextProps.reload) {
      reload = true;
    }
    if (nextProps.pathname === this.props.pathname && !reload) {
      return;
    }
    this.setState({ isLoading: true, pageIndex: 0 });
    const response = await ListAction.getList(1, nextProps.pathname);
    this.setState({
      pageIndex: 1,
      pageTotal: response.pageTotal,
      list: response.list,
      isLoading: false
    });
  }

  _onRefresh = async () => {
    this.setState({ isLoading: true });
    const response = await ListAction.getList(1, this.props.pathname);
    this.setState({
      pageIndex: 1,
      pageTotal: response.pageTotal,
      list: response.list,
      isLoading: false
    });
  };

  _toEnd = () => {
    if (this.state.isLoading || this.state.pageIndex >= this.state.pageTotal) {
      return;
    }
    InteractionManager.runAfterInteractions(() => {
      this._loadMoreData();
    });
  };

  _loadMoreData = async () => {
    this.setState({ isLoading: true });
    const response = await ListAction.getList(this.state.pageIndex + 1, this.props.pathname);
    this.setState({
      pageIndex: this.state.pageIndex + 1,
      pageTotal: response.pageTotal,
      list: this.state.list.concat(response.list),
      isLoading: false
    });
  };

  _renderFooter = () => {
    if (this.state.isLoading) {
      return null;
    }
    if (this.state.pageIndex < this.state.pageTotal) {
      return <LoadMoreFooter isLoadAll={false} />;
    }
    return <LoadMoreFooter isLoadAll />;
  };

  render() {
    if (this.state.isLoading && this.state.pageIndex < 1) {
      return (
        <ActivityIndicator style={utils.verticalCenter} />
      );
    }

    return (
      <VirtualizedList
        data={this.state.list}
        onEndReached={this._toEnd}
        onEndReachedThreshold={1}
        initialListSize={20}
        ListFooterComponent={this._renderFooter}
        enableEmptySections
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
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
