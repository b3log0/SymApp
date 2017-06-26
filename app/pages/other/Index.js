import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import userAction from '../../actions/User';
import { utils, module } from '../../styles';

class Other extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  componentWillMount() {
    userAction.isLogin().then((isLogin) => {
      if (!isLogin) {
        this.props.navigation.navigate('Login');
      }
    });
  }

  render() {
    return (
      <ScrollView style={utils.statusBar}>
        <View style={module.wrap}>
          <TouchableOpacity style={module.list} onPress={this._goView}>
            <Text>Other[开发中]</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default Other;
