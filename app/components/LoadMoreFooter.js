import React, { Component, PropTypes } from 'react';
import {
  View,
  Text
} from 'react-native';
import { inject } from 'mobx-react';

import { load } from '../styles';

@inject('entity')
class LoadMoreFooter extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired
  };

  render() {
    const { entity } = this.props;

    return (
      <View style={load.footer.content}>
        <Text style={load.footer.title}>{entity.isLoadAll ? '已加载全部' : '正在加载更多……'}</Text>
      </View>
    );
  }
}

export default LoadMoreFooter;
