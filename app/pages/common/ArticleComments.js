import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  View,
  TextInput,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { inject } from 'mobx-react';

import List from '../../components/list';
import articleAction from '../../actions/Article';
import { utils, common, article as articleStyle } from '../../styles';

@inject('article')
class ArticleComments extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions ={
    title: '评论',
    tabBarVisible: false
  };

  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      reload: false
    };
  }

  async componentWillMount() {
    const comment = await AsyncStorage.getItem('@ArticleStore:comment');
    this.setState({ comment });
  }

  _submitComment = async () => {
    if (this.state.comment === '') {
      Alert.alert('回帖内容长度 1-2000');
      return;
    }

    const response = await articleAction.comment();
    if (response) {
      this.setState({
        comment: '',
        reload: true
      });
    }
  };

  render() {
    const { article } = this.props;
    return (
      <View style={utils.column}>
        <List
          reload={this.state.reload}
          pathname={`article/${article.oId}`}
          navigation={this.props.navigation}
          style={utils.flex}
        />
        <KeyboardAvoidingView
          behavior="padding"
          style={[articleStyle.commentSubmit, common.statusBar]}
        >
          <View style={articleStyle.commentInputWrap}>
            <TextInput
              style={articleStyle.commentInput}
              underlineColorAndroid="transparent"
              placeholder={'回帖/点击评论后回复评论'}
              value={this.state.comment}
              maxLength={2000}
              onChangeText={(text) => {
                this.setState({ comment: text, reload: false });
                AsyncStorage.setItem('@ArticleStore:comment', text);
              }}
            />
          </View>
          <View style={articleStyle.commentBtn}>
            <Button title={'提交'} onPress={this._submitComment} />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default ArticleComments;
