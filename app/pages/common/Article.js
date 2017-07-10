import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Button,
  Modal,
  ActivityIndicator,
  WebView,
  Dimensions,
  View,
  Text,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import { inject, observer } from 'mobx-react';

import List from '../../components/list';
import ownerAction from '../../actions/Owner';
import articleAction from '../../actions/Article';
import Login from '../../components/Login';
import { origin } from '../../config/symphony';
import { utils, color, article as articleStyle } from '../../styles';

@inject('article', 'owner')
@observer
class Article extends Component {
  static propTypes = {
    owner: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height.toString(),
      pathname: `article/${this.props.navigation.state.params.oId}`,
      comment: ''
    };
  }

  async componentWillMount() {
    const { article } = this.props;
    ownerAction.isLogin();
    article.setOId(this.props.navigation.state.params.oId);
    articleAction.getDetail(1);

    const comment = await AsyncStorage.getItem('@ArticleStore:comment');
    this.setState({ comment });
  }

  _goUpdate = async () => {
    const { owner } = this.props;
    if (owner.isLogin) {
      this.props.navigation.navigate('MemberPost', { stackTitle: '更新' });
    } else {
      owner.setShowLogin(true);
    }
  };

  _onMessage = (e) => {
    this.setState({
      height: e.nativeEvent.data,
      scrollEnabled: true
    });
  };

  _submitComment = async () => {
    const response = await articleAction.comment();
    if (response) {
      this.setState({
        comment: ''
      });
    }
  };

  render() {
    const { article, owner } = this.props;

    const injectJS = `
    $("body").addClass("content-reset").html($(".article-content").last().html());
    $(window).ready(function () {
      postMessage($('body').height().toString());
    })`;

    const gestureHandlers = {
      onStartShouldSetResponder: () => true,
      onResponderGrant: () => {
        this.setState({ scrollEnabled: true });
      },
      onResponderTerminate: () => {
        this.setState({ scrollEnabled: false });
      }
    };

    return (
      <ScrollView {...gestureHandlers} scrollEnabled={this.state.scrollEnabled}>
        <Modal visible={owner.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        {
          (article.type !== 3 && owner.name === article.authorName) ?
            <Button title={'更新'} onPress={this._goUpdate} /> :
          null
        }
        <View style={{ backgroundColor: color.white }}>
          <WebView
            style={[{
              height: Math.floor(this.state.height)
            }, articleStyle.content]}
            scrollEnabled={false}
            renderLoading={() => <ActivityIndicator style={utils.verticalCenter} />}
            onMessage={this._onMessage}
            injectedJavaScript={injectJS}
            source={{ uri: `${origin}article/${article.oId}` }}
          />
        </View>
        <Text style={articleStyle.commentTitle}>评论</Text>
        <List pathname={this.state.pathname} navigation={this.props.navigation} />
        <KeyboardAvoidingView behavior="padding">
          <View style={articleStyle.commentSubmit}>
            <View style={articleStyle.commentInputWrap}>
              <TextInput
                style={articleStyle.commentInput}
                underlineColorAndroid="transparent"
                placeholder={this.state.commentPlaceholder}
                value={this.state.comment}
                maxLength={2000}
                onChangeText={(text) => {
                  this.setState({ comment: text });
                  AsyncStorage.setItem('@ArticleStore:comment', text);
                }}
              />
            </View>
            <View style={articleStyle.commentBtn}>
              <Button title={'提交'} onPress={this._submitComment} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default Article;
