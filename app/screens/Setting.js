import React, { Component } from 'react';
import {
  Text,
  Image,
  View
} from 'react-native';

import common from '../styles/common';
import settingPng from '../images/setting.png';

class SettingScreen extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={settingPng}
        style={[common.navgation, { tintColor }]}
      />
    )
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

export default SettingScreen;
