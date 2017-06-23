import React, { Component, PropTypes } from 'react';
import {
  WebView
} from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('webView')
@observer
class Article extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    webView: PropTypes.object.isRequired
  };

  render() {
    const { params } = this.props.navigation.state;
    const { webView } = this.props;
    return (
      <WebView
        scrollEnabled={webView.scrollEnabled}
        source={{ uri: `https://hacpai.com/article/${params.oId}` }}
      />
    );
  }
}

export default Article;
