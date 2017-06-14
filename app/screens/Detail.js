import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const isInfo = state.params.mode === 'info';
    const { user } = state.params;
    return {
      title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
      tabBarVisible: false,
      headerRight: (
        <Button
          title={isInfo ? 'Done' : `${user}'s info`}
          onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })}
        />
      )
    };
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired
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

export default DetailScreen;
