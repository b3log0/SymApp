import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { inject } from 'mobx-react';

import ownerAction from '../../../actions/Owner';
import { list, common } from '../../../styles';

@inject('owner', 'article')
class Article extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goArticle = async () => {
    const isLogin = await ownerAction.isLogin();
    const { owner, article } = this.props;
    if (!isLogin) {
      owner.setShowLogin(true);
      return;
    }

    const rowData = this.props.rowData;
    let stackTitle = '文章';
    switch (rowData.articleType) {
      case 1:
        stackTitle = '小黑屋';
        break;
      case 2:
        stackTitle = '同城广播';
        break;
      case 3:
        stackTitle = '思绪';
        break;
      default:
        break;
    }
    article.preSet({
      oId: rowData.oId,
      authorName: rowData.articleAuthorName,
      type: rowData.articleType
    });
    this.props.navigation.navigate('Article', {
      oId: rowData.oId,
      stackTitle
    });
  };

  render() {
    const rowData = this.props.rowData;

    let thumbanilImg = null;
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
          <Text style={list.title}>{rowData.articleTitleEmojUnicode}</Text>
          <View style={list.info} >
            <Image
              source={{ uri: rowData.articleAuthorThumbnailURL48 }}
              style={common.avatar}
            />
            <Text style={list.infoText}>
              {rowData.articleAuthorName}
            </Text>
          </View>
          <Text style={list.content}>{rowData.articlePreviewContent}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Article;
