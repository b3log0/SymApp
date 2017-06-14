import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  footerTitle: {
    marginLeft: 10,
    fontSize: 15,
    color: 'gray'
  }
});

class LoadMoreFooter extends PureComponent {
  static propTypes = {
    isLoadAll: PropTypes.bool
  }

  static defaultProps = {
    isLoadAll: false
  };

  render() {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>{this.props.isLoadAll ? '已加载全部' : '正在加载更多……'}</Text>
      </View>
    );
  }
}

export default LoadMoreFooter;
