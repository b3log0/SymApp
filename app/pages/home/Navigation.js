import React, { PureComponent, PropTypes } from 'react';
import {
  Button,
  View
} from 'react-native';


class Navigation extends PureComponent {

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

export default Navigation;
