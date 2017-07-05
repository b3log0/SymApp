import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import articleAction from '../../actions/Article';
import { post, utils, icon } from '../../styles';
import uploadPng from '../../images/upload.png';
import atPng from '../../images/at.png';
import tagsPng from '../../images/tags.png';

const {
  KeyboardAvoidingView,
  Image,
  TextInput,
  View,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  Button,
  Modal
} = ReactNative;

class Post extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
      showTag: false
    };
  }

  async componentWillMount() {
    const title = await AsyncStorage.getItem('@ArticleStore:title');
    const content = await AsyncStorage.getItem('@ArticleStore:content');
    const tags = await AsyncStorage.getItem('@ArticleStore:tags');

    this.setState({ title, tags, content });
  }

  _post = async () => {
    const article = this.state;
    await articleAction.post({
      articleTitle: article.title,
      articleContent: article.content,
      articleTags: article.tags
    }, this.props.navigation);
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={utils.flex}>
        <Modal visible={this.state.showTag} onRequestClose={() => null}>
          <TextInput
            style={[utils.statusBar, post.content]}
            underlineColorAndroid="transparent"
            placeholder="标签，请用英文逗号分割"
            multiline
            value={this.state.tags}
            numberOfLines={10}
            onChangeText={(text) => {
              this.setState({ tags: text });
              AsyncStorage.setItem('@ArticleStore:tags', text);
            }}
          />
          <Button
            style={post.tagBtn}
            onPress={() => this.setState({ showTag: false })}
            title={'确定'}
          />
        </Modal>
        <View style={post.titleWrap}>
          <TextInput
            style={post.title}
            value={this.state.title}
            underlineColorAndroid="transparent"
            placeholder="标题"
            autoFocus
            maxLength={40}
            onChangeText={(text) => {
              this.setState({ title: text });
              AsyncStorage.setItem('@ArticleStore:title', text);
            }}
          />
        </View>
        <TextInput
          style={post.content}
          underlineColorAndroid="transparent"
          placeholder="正文"
          multiline
          value={this.state.content}
          numberOfLines={10}
          onChangeText={(text) => {
            this.setState({ content: text });
            AsyncStorage.setItem('@ArticleStore:content', text);
          }}
        />
        <View style={post.statusBar}>
          <TouchableOpacity
            style={post.statusBarItem}
            onPress={() => {
              Alert.alert('开发中');
            }}
          >
            <Image source={uploadPng} style={icon.normal} />
          </TouchableOpacity>
          <TouchableOpacity
            style={post.statusBarItem}
            onPress={() => {
              Alert.alert('开发中，请先手动输入 @');
            }}
          >
            <Image source={atPng} style={icon.normal} />
          </TouchableOpacity>
          <TouchableOpacity
            style={post.statusBarItem}
            onPress={() => this.setState({ showTag: true })}
          >
            <Image source={tagsPng} style={icon.normal} />
          </TouchableOpacity>
          <View style={post.button}>
            <Button title={'提交'} onPress={this._post} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Post;
