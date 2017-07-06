import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { inject, observer } from 'mobx-react';

import Login from '../../components/Login';
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

@inject('user', 'article')
@observer
class Post extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: '',
      showTag: false,
      isUpdate: false
    };
  }

  async componentWillMount() {
    const { article } = this.props;

    if (this.props.navigation.state.params.stackTitle === '更新') {
      this.state.isUpdate = true;
    }

    let title = '';
    let content = '';
    let tags = '';
    if (this.state.isUpdate) {
      title = article.title;
      content = article.content;
      article.tags.forEach((data) => {
        tags += `${data.tagTitle},`;
      });
      tags = tags.substring(0, tags.length - 1);
    } else {
      title = await AsyncStorage.getItem('@ArticleStore:title');
      content = await AsyncStorage.getItem('@ArticleStore:content');
      tags = await AsyncStorage.getItem('@ArticleStore:tags');
    }

    this.setState({ title, tags, content });
  }

  _post = () => {
    const article = this.state;
    if (this.state.isUpdate) {
      articleAction.update({
        articleTitle: article.title,
        articleContent: article.content,
        articleTags: article.tags,
        articleType: this.props.article.type
      }, this.props.navigation);
      return false;
    }
    articleAction.post({
      articleTitle: article.title,
      articleContent: article.content,
      articleTags: article.tags
    }, this.props.navigation);
    return false;
  };

  render() {
    const { user } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={utils.flex}>
        <Modal visible={user.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
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
              if (!this.state.isUpdate) {
                AsyncStorage.setItem('@ArticleStore:tags', text);
              }
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
              if (!this.state.isUpdate) {
                AsyncStorage.setItem('@ArticleStore:title', text);
              }
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
            if (!this.state.isUpdate) {
              AsyncStorage.setItem('@ArticleStore:content', text);
            }
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
