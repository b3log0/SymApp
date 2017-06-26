import React, { Component, PropTypes } from 'react';
import {
  View,
  RefreshControl,
  ActivityIndicator,
  InteractionManager,
  VirtualizedList,
  Text,
  Image
} from 'react-native';
import { inject, observer } from 'mobx-react';

import Articles from '../../actions/Articles';
import LoadMoreFooter from '../../components/LoadMoreFooter';
import ListItem from '../../components/article/ListItem';
import addfilePng from '../../images/addfile.png';
import { utils, index } from '../../styles/index';

@inject('pagination', 'entity')
@observer
class Index extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired
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
        <Image source={addfilePng} style={index.addIcon} />
      </View>
    );
  }
}

export default Index;
