import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  WebView,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { inject } from 'mobx-react';

import { origin } from '../../config/symphony';
import { utils, common, icon, article as articleStyle } from '../../styles';
import removepng from '../../images/remove.png';
import editpng from '../../images/edit.png';
import cmtspng from '../../images/cmts.png';

@inject('article', 'owner')
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
      scrollEnabled: true,
      loadEnd: false
    };
  }

  _goUpdate = () => {
    this.props.navigation.navigate('MemberPost', { stackTitle: '更新' });
  };

  _goComments = () => {
    const { article } = this.props;
    article.setCommentOriginalCommentId('');
    this.props.navigation.navigate('ArticleComments', { stackTitle: '更新' });
  };

  _onMessage = () => {
    this.setState({
      loadEnd: true
    });
  };

  render() {
    const { article, owner } = this.props;

    const injectJS = `
    $(window).ready(function () {
      $('body').addClass('content-reset').html($('.article-content').last().html());
      $('html').css({
        'background-color': '#fff',
        'padding': '10px'
      });
      postMessage();
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
      <View
        style={articleStyle.articleWrap}
        {...gestureHandlers}
      >
        {
          this.state.loadEnd ? null :
          <ActivityIndicator style={[utils.verticalCenter, utils.flex]} />
        }
        <WebView
          style={[
            utils.flex,
            this.state.loadEnd ? utils.show : utils.hidden
          ]}
          scrollEnabled={this.state.scrollEnabled}
          onMessage={this._onMessage}
          injectedJavaScript={injectJS}
          source={{ uri: `${origin}article/${article.oId}` }}
        />
        <View style={common.statusBar}>
          {
            (article.type !== 3 && owner.name === article.authorName) ?
              <TouchableOpacity
                style={common.statusBarItem}
                onPress={this._goUpdate}
              >
                <Image source={editpng} style={icon.normal} />
              </TouchableOpacity>
              :
              null
          }
          {
            (owner.name === article.authorName) ?
              <TouchableOpacity
                style={common.statusBarItem}
                onPress={this._remove}
              >
                <Image source={removepng} style={icon.normal} />
              </TouchableOpacity>
              :
              null
          }
          <TouchableOpacity
            style={common.statusBarItem}
            onPress={this._goComments}
          >
            <Image source={cmtspng} style={icon.normal} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Article;
