import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { inject } from 'mobx-react';

import userAction from '../actions/User';
import { form, icon, color, utils } from '../styles/index';
import logoPng from '../images/logo.png';

const {
  KeyboardAvoidingView,
  Image,
  Button,
  TextInput,
  View,
  AsyncStorage
} = ReactNative;

@inject('user')
class Login extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  componentWillMount() {
    const { user } = this.props;
    AsyncStorage.getItem('@UserStore:name', (key, value) => {
      user.name = value;
      this.setState({ name: value });
    });
  }

  _login = async () => {
    const { user } = this.props;
    const sc = await userAction.login(user.name, user.password);
    if (sc === 0) {
      user.setShowLogin(false);
    }
  };

  render() {
    const { user } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={utils.verticalCenter}>
        <Image
          source={logoPng}
          style={[icon.big, form.logo]}
        />
        <TextInput
          style={form.input}
          value={this.state.name}
          underlineColorAndroid="transparent"
          placeholder="用户名／邮箱"
          onChangeText={(text) => {
            this.setState({ name: text });
            user.name = text;
          }}
        />
        <TextInput
          style={form.input}
          underlineColorAndroid="transparent"
          placeholder="密码"
          secureTextEntry
          onChangeText={(text) => {
            user.password = text;
          }}
        />
        <View style={form.button}>
          <Button
            onPress={this._login}
            color={color.green}
            title="登录"
            accessibilityLabel="登录"
          />
        </View>
        <View style={form.button}>
          <Button
            onPress={() => {
              user.setShowLogin(false);
            }}
            color={color.green}
            title="取消"
            accessibilityLabel="取消"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
