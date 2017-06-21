import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { inject, observer } from 'mobx-react';

import HomeNavigation from '../home/Navigation';
import userAction from '../../actions/User';
import { form, icon, color } from '../../styles';
import logoPng from '../../images/logo.png';

const {
  KeyboardAvoidingView,
  Image,
  Button,
  TextInput,
  View
} = ReactNative;

@inject('user')
@observer
class Login extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      name: '',
      password: ''
    };
  }

  _login = () => {
    userAction.login(this.state.name, this.state.password);
    this.render();
  }

  render() {
    const { user } = this.props;

    if (user.isLogin) {
      return (<HomeNavigation />);
    }

    return (
      <KeyboardAvoidingView behavior="padding" style={form.wrap}>
        <Image
          source={logoPng}
          style={[icon.big, form.logo]}
        />
        <TextInput
          style={form.input}
          underlineColorAndroid="transparent"
          placeholder="用户名／邮箱"
          onChangeText={(value) => {
            this.setState({ name: value });
          }}
        />
        <TextInput
          style={form.input}
          underlineColorAndroid="transparent"
          placeholder="密码"
          secureTextEntry
          onChangeText={(value) => {
            this.setState({ password: value });
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
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
