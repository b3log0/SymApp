import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Button
} from 'react-native';

class Notification extends PureComponent {
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

export default Notification;
