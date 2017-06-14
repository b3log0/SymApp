import React, { Component, PropTypes } from 'react';
import {
  View,
  Button,
  Image
} from 'react-native';

import { icon } from '../../styles';
import feedPng from '../../images/feed.png';

class NotificationScreen extends Component {
  static navigationOptions = {
    showLabel: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={feedPng}
        style={[icon.normal, { tintColor }]}
      />
    )
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('Detail', { user: 'Vanessa' })}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}

export default NotificationScreen;
