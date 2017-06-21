import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import userAction from '../../actions/User';
import { utils, form, icon, color } from '../../styles';
import logoPng from '../../images/logo.png';

class Login extends Component {

  _login = () => {
    userAction.login();
  }

  render() {
    return (
      <View style={[utils.statusBar]}>
        <Image
          source={logoPng}
          style={[icon.big, form.logo]}
        />
        <KeyboardAvoidingView
          behavior="padding"
        >
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
          <View style={form.button}>
            <Button
              onPress={this._login}
              color={color.green}
              title="登录"
              accessibilityLabel="登录"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Login;
