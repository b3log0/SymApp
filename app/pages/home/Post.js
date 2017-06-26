import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { inject, observer } from 'mobx-react';

import userAction from '../../actions/User';
import { post, utils, icon } from '../../styles';
import uploadPng from '../../images/upload.png';
import atPng from '../../images/at.png';
import tagsPng from '../../images/tags.png';

const {
  KeyboardAvoidingView,
  Image,
  Switch,
  TextInput,
  View,
  AsyncStorage,
  Text
} = ReactNative;

@inject('user')
@observer
class Post extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
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

  _post = () => {
    const { user } = this.props;
    userAction.login(user.name, user.password).then((sc) => {
      if (sc === 0) {
        this.props.navigation.goBack();
      }
    });
  }

  render() {
    const { user } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={utils.flex}>
        <View style={post.titleWrap}>
          <TextInput
            style={post.title}
            value={this.state.name}
            underlineColorAndroid="transparent"
            placeholder="标题"
            autoFocus
            maxLength={40}
            onChangeText={(text) => {
              this.setState({ name: text });
              user.name = text;
            }}
          />
        </View>
        <TextInput
          style={post.content}
          underlineColorAndroid="transparent"
          placeholder="正文"
          multiline
          numberOfLines={10}
          onChangeText={(text) => {
            user.password = text;
          }}
        />
        <TextInput
          style={post.tags}
          underlineColorAndroid="transparent"
          placeholder="标签"
          onChangeText={(text) => {
            user.password = text;
          }}
        />
        <View style={post.statusBar}>
          <Image source={uploadPng} style={[icon.normal, post.statusBarItem]} />
          <Image source={atPng} style={[icon.normal, post.statusBarItem]} />
          <Image source={tagsPng} style={[icon.normal, post.statusBarItem]} />
          <Text style={[post.statusBarItem]}>同步</Text><Switch style={[post.statusBarItem]} />
          <Text style={[post.statusBarItem]}>匿名</Text><Switch style={[post.statusBarItem]} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Post;
