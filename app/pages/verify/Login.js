import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  Image
} from 'react-native';

import { utils, form, icon } from '../../styles';
import logoPng from '../../images/logo.png'

class Login extends Component {

  render() {
    return (
      <View style={[utils.statusBar]}>
        <Image
          source={logoPng}
          style={[icon.big, form.logo]}
        />
        <TextInput
          style={form.input}
          underlineColorAndroid="transparent"
          placeholder="用户名／邮箱"
        />
        <TextInput
          style={form.input}
          underlineColorAndroid="transparent"
          placeholder="密码"
          secureTextEntry
        />
        <Text>login</Text>
      </View>
    );
  }
}

export default Login;
