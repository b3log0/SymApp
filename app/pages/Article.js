import React, { PureComponent, PropTypes } from 'react';
import {
  WebView
} from 'react-native';

class Detail extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    const { params } = this.props.navigation.state;

    return (
      <WebView
        ref={(web) => { this.injectWebView = web; }}
        source={{ uri: `https://hacpai.com/article/${params.oId}` }}
      />
    );
  }
}

export default Detail;
