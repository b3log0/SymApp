import React, { Component } from 'react';
import {
  Button,
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

export default SettingScreen;
