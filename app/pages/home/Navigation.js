import React, { Component, PropTypes } from 'react';
import {
  Button,
  Image,
  View
} from 'react-native';

import { icon } from '../../styles';
import settingPng from '../../images/setting.png';

class Navigation extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={settingPng}
        style={[icon.normal, { tintColor }]}
      />
    )
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

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

export default Navigation;
