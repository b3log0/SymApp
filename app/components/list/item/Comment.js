import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { inject } from 'mobx-react';

import HTML from '../../../components/html';
import { list, common } from '../../../styles';

@inject('article')
class Comment extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goComment = () => {
    const { rowData, article } = this.props;
    article.preSet({
      oId: rowData.commentOnArticleId,
      authorName: rowData.commentArticleAuthorName
    });
    this.props.navigation.navigate('Article', {
      oId: rowData.commentOnArticleId,
      stackTitle: rowData.commentArticleTitleEmojUnicode
    });
  };

  render() {
    const rowData = this.props.rowData;
    return (
      <View style={list.normal}>
        <TouchableOpacity onPress={this._goComment}>
          <Text style={list.title}>{rowData.commentArticleTitleEmojUnicode}</Text>
          <View style={list.info} >
            <Image
              source={{ uri: rowData.commentArticleAuthorThumbnailURL }}
              style={common.avatar}
            />
            <Text style={list.infoText}>
              {rowData.commentArticleAuthorName}
            </Text>
          </View>
          <HTML
            html={rowData.commentContent}
            onLinkPress={url => this.props.navigation.navigate('WebView', { path: url })}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Comment;
