import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TextInput,
  View,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  Button,
  Modal
} from 'react-native';
import { inject } from 'mobx-react';

import articleAction from '../../actions/Article';
import { post, utils, icon, common } from '../../styles';
import uploadPng from '../../images/upload.png';
import atPng from '../../images/at.png';
import tagsPng from '../../images/tags.png';
import goodsPng from '../../images/goods.png';
import ImgUpload from '../../components/ImgUpload';
import { qiniu } from '../../config/symphony';

@inject('article')
class Post extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired
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
      rewardContent: '',
      rewardPoint: '',
      showTag: false,
      showReward: false,
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
    let rewardContent = '';
    let rewardPoint = '';
    if (this.state.isUpdate) {
      title = article.title;
      content = article.content;
      tags = article.tags;
      rewardContent = article.rewardContent;
      rewardPoint = article.rewardPoint;
    } else {
      title = await AsyncStorage.getItem('@ArticleStore:title');
      content = await AsyncStorage.getItem('@ArticleStore:content');
      tags = await AsyncStorage.getItem('@ArticleStore:tags');
      rewardContent = await AsyncStorage.getItem('@ArticleStore:rewardContent');
      rewardPoint = await AsyncStorage.getItem('@ArticleStore:rewardPoint');
    }

    this.setState({ title, tags, content, rewardContent, rewardPoint });
  }

  _post = () => {
    const article = this.state;
    if (this.state.isUpdate) {
      articleAction.update({
        articleTitle: article.title,
        articleContent: article.content,
        articleTags: article.tags,
        articleType: this.props.article.type,
        articleRewardContent: article.rewardContent,
        articleRewardPoint: Math.floor(article.rewardPoint)
      }, this.props.navigation);
    } else {
      articleAction.post({
        articleTitle: article.title,
        articleContent: article.content,
        articleTags: article.tags,
        articleRewardContent: article.rewardContent,
        articleRewardPoint: Math.floor(article.rewardPoint)
      }, this.props.navigation);
    }
  };

  _uploadImg = async (type) => {
    try {
      const response = await ImgUpload.upload();
      const path = JSON.parse(response.responseText).key;
      const pathList = path.split('/');
      const content = `${this.state[type] || ''}
![${pathList[pathList.length - 1]}](${qiniu.origin}${path})`;

      const state = {};
      state[type] = content;
      this.setState(state);
      if (!this.state.isUpdate) {
        AsyncStorage.setItem(`@ArticleStore:${type}`, content);
      }
    } catch (e) {
      console.log('Image Upload Error:', e);
    }
  };

  render() {
    return (
      <View style={utils.column}>
        <Modal visible={this.state.showTag} onRequestClose={() => null}>
          <TextInput
            style={[utils.statusBar, post.content]}
            underlineColorAndroid="transparent"
            placeholder="标签，请用英文逗号分割"
            multiline
            value={this.state.tags}
            onChangeText={(text) => {
              this.setState({ tags: text });
              if (!this.state.isUpdate) {
                AsyncStorage.setItem('@ArticleStore:tags', text);
              }
            }}
          />
          <Button
            onPress={() => this.setState({ showTag: false })}
            title={'确定'}
          />
        </Modal>
        <Modal visible={this.state.showReward} onRequestClose={() => null}>
          <View style={[post.titleWrap, utils.statusBar]}>
            <TextInput
              style={post.title}
              value={this.state.rewardPoint}
              underlineColorAndroid="transparent"
              placeholder="打赏积分"
              autoFocus
              keyboardType={'numeric'}
              maxLength={40}
              onChangeText={(text) => {
                this.setState({ rewardPoint: text });
                if (!this.state.isUpdate) {
                  AsyncStorage.setItem('@ArticleStore:rewardPoint', text);
                }
              }}
            />
          </View>
          <TextInput
            style={post.content}
            underlineColorAndroid="transparent"
            placeholder="打赏区"
            multiline
            value={this.state.rewardContent}
            numberOfLines={10}
            onChangeText={(text) => {
              this.setState({ rewardContent: text });
              if (!this.state.isUpdate) {
                AsyncStorage.setItem('@ArticleStore:rewardContent', text);
              }
            }}
          />
          <View style={common.statusBar}>
            <TouchableOpacity
              style={common.statusBarItem}
              onPress={() => {
                this._uploadImg('rewardContent');
              }}
            >
              <Image source={uploadPng} style={icon.normal} />
            </TouchableOpacity>
            <View style={common.statusBarBtn}>
              <Button
                title={'确定'}
                onPress={() => this.setState({ showReward: false })}
              />
            </View>
          </View>
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
          onChangeText={(text) => {
            this.setState({ content: text });
            if (!this.state.isUpdate) {
              AsyncStorage.setItem('@ArticleStore:content', text);
            }
          }}
        />
        <View style={common.statusBar}>
          <TouchableOpacity
            style={common.statusBarItem}
            onPress={() => this.setState({ showReward: true })}
          >
            <Image source={goodsPng} style={icon.normal} />
          </TouchableOpacity>
          <TouchableOpacity
            style={common.statusBarItem}
            onPress={() => {
              this._uploadImg('content');
            }}
          >
            <Image source={uploadPng} style={icon.normal} />
          </TouchableOpacity>
          <TouchableOpacity
            style={common.statusBarItem}
            onPress={() => {
              Alert.alert('开发中，请先手动输入 @');
            }}
          >
            <Image source={atPng} style={icon.normal} />
          </TouchableOpacity>
          <TouchableOpacity
            style={common.statusBarItem}
            onPress={() => this.setState({ showTag: true })}
          >
            <Image source={tagsPng} style={icon.normal} />
          </TouchableOpacity>
          <View style={common.statusBarBtn}>
            <Button title={'提交'} onPress={this._post} />
          </View>
        </View>
      </View>
    );
  }
}

export default Post;
