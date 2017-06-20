import React, { PureComponent, PropTypes } from 'react';
import {
  WebView
} from 'react-native';

class Detail extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {

    return (
      <WebView
        ref={(web) => { this.injectWebView = web; }}
        source={{ uri: `https://hacpai.com/article/${params.oId}` }}
      />
    );
  }
}

export default Detail;
const { params } = this.props.navigation.state;