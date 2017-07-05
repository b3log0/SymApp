import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import HTML from '../../../components/html';
import { list } from '../../../styles/index';

class Comment extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goComment = () => {
    const rowData = this.props.rowData;
    this.props.navigation.navigate('WebView',
      { path: `article/${rowData.commentOnArticleId}#${rowData.commenter.oId}` });
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
              style={list.avatar}
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
