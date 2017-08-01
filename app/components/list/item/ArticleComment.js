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
class ArticleComment extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _setReply = () => {
    const { article, rowData } = this.props;
    article.setCommentOriginalCommentId(rowData.oId);
  };

  render() {
    const rowData = this.props.rowData;
    return (
      <View style={list.normal}>
        <TouchableOpacity onPress={this._setReply}>
          <View style={list.info} >
            <Image
              source={{ uri: rowData.commentAuthorThumbnailURL }}
              style={common.avatar}
            />
            <Text style={list.infoText}>
              {rowData.commentAuthorName}
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

export default ArticleComment;
