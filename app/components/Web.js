import React, { Component, PropTypes } from 'react';
import {
  WebView,
  View
} from 'react-native';

import { utils } from '../styles/index';
import { origin } from '../config/symphony';

class Web extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true
    };
  }

  componentWillMount() {
    this._gestureHandlers = {
      onStartShouldSetResponder: () => true,
      onResponderGrant: () => {
        this.setState({ scrollEnabled: true });
      },
      onResponderTerminate: () => {
        this.setState({ scrollEnabled: false });
      }
    };
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={utils.flex} {...this._gestureHandlers}>
        <WebView
          scrollEnabled={this.state.scrollEnabled}
          source={{ uri: `${origin}${params.path}` }}
        />
      </View>
    );
  }
}

export default Web;
