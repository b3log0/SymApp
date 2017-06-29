import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import { utils, list } from '../../styles';

class ListItem extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    rowData: PropTypes.object.isRequired
  };

  _goArticle = () => {
    const rowData = this.props.rowData;
    this.props.navigation.navigate('WebView', { path: `article/${rowData.oId}` });
  };

  _goComment = () => {
    const rowData = this.props.rowData;
    this.props.navigation.navigate('WebView',
      { path: `article/${rowData.commentOnArticleId}#${rowData.commenter.oId}` });
  };

  _genArticleListItem = () => {
    const rowData = this.props.rowData;

    let thumbanilImg = <Text style={utils.empty} />;
    if (rowData.articleThumbnailURL !== '') {
      thumbanilImg = (<Image
        style={list.thumbnailImg}
        source={{ uri: rowData.articleThumbnailURL }}
      />);
    }
    return (
      <View style={list.normal}>
        <TouchableOpacity onPress={this._goArticle}>
          {thumbanilImg}
          <Text style={list.title}>{rowData.articleTitle}</Text>
          <View style={list.info} >
            <Image
              source={{ uri: rowData.articleAuthorThumbnailURL48 }}
              style={list.avatar}
            />
            <Text style={list.infoText}>
              {rowData.articleAuthorName}
            </Text>
          </View>
          <Text style={list.content}>{rowData.articlePreviewContent}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _genCommentListItem = () => {
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

  render() {
    const rowData = this.props.rowData;

    if (typeof (rowData.articleTitle) === 'undefined') {
      return this._genCommentListItem();
    }

    return this._genArticleListItem();
  }
}

export default ListItem;
