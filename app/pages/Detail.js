import React, { PureComponent, PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';

class Detail extends PureComponent {
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

export default Detail;
