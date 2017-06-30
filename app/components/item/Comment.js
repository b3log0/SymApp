import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import { list } from '../../styles';

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
          <Text style={list.title}>{rowData.commentArticleTitle}</Text>
          <View style={list.info} >
            <Image
              source={{ uri: rowData.commentArticleAuthorThumbnailURL }}
              style={list.avatar}
            />
            <Text style={list.infoText}>
              {rowData.commentArticleAuthorName}
            </Text>
          </View>
          <HTMLView
            value={rowData.commentContent}
            // stylesheet={styles}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Comment;
