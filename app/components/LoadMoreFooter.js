import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text
} from 'react-native';

import { load } from '../styles';

class LoadMoreFooter extends PureComponent {
  static propTypes = {
    isLoadAll: PropTypes.bool
  };

  static defaultProps = {
    isLoadAll: false
  };

  render() {
    return (
      <View style={load.footer.content}>
        <Text style={load.footer.title}>{this.props.isLoadAll ? '已加载全部' : '正在加载更多……'}</Text>
      </View>
    );
  }
}

export default LoadMoreFooter;
