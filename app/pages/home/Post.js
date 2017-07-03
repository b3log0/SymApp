import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { inject } from 'mobx-react';

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

@inject('article')
class Post extends Component {

  static propTypes = {
    article: PropTypes.object.isRequired,
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

  componentWillMount() {
    const { article } = this.props;
    AsyncStorage.getItem('@ArticleStore:title', (key, value) => {
      if (value) {
        article.title = value;
        this.setState({ title: value });
      }
    });
    AsyncStorage.getItem('@ArticleStore:content', (key, value) => {
      if (value) {
        article.content = value;
        this.setState({ content: value });
      }
    });
    AsyncStorage.getItem('@ArticleStore:tags', (key, value) => {
      if (value) {
        article.tags = value;
        this.setState({ tags: value });
      }
    });
  }

  _post = async () => {
    const { article } = this.props;
    const msg = await articleAction.post({
      articleTitle: article.title,
      articleContent: article.content,
      articleTags: article.tags
    });

    if (msg === 0) {
      this.setState({
        title: '',
        content: '',
        tags: '',
        showTag: false
      });
      this.props.navigation.goBack();
    }
  };

  render() {
    const { article } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={utils.flex}>
        <Modal visible={this.state.showTag}>
          <TextInput
            style={[utils.statusBar, post.content]}
            underlineColorAndroid="transparent"
            placeholder="标签，请用英文逗号分割"
            multiline
            value={this.state.tags}
            numberOfLines={10}
            onChangeText={(text) => {
              this.setState({ tags: text });
              article.tags = text;
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
              article.title = text;
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
            article.content = text;
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
