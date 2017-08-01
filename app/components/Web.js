import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  WebView,
  View,
  ActivityIndicator
} from 'react-native';

import { utils } from '../styles';
import { origin } from '../config/symphony';

class Web extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true
    };
  }

  render() {
    const { params } = this.props.navigation.state;
    const gestureHandlers = {
      onStartShouldSetResponder: () => true,
      onResponderGrant: () => {
        this.setState({ scrollEnabled: true });
      },
      onResponderTerminate: () => {
        this.setState({ scrollEnabled: false });
      }
    };

    return (
      <View style={utils.flex} {...gestureHandlers}>
        <WebView
          scrollEnabled={this.state.scrollEnabled}
          startInLoadingState
          injectedJavaScript={params.injectJS}
          renderLoading={() => <ActivityIndicator style={utils.verticalCenter} />}
          source={{ uri: `${params.path.indexOf('http') === 0 ? '' : origin}${params.path}` }}
        />
      </View>
    );
  }
}

export default Web;
