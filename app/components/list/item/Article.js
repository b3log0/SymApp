import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { utils, list } from '../../../styles/index';

class Article extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goArticle = () => {
    const rowData = this.props.rowData;
    this.props.navigation.navigate('Article', {
      oId: rowData.oId,
      articleType: rowData.articleType
    });
  };

  render() {
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
          <Text style={list.title}>{rowData.articleTitleEmojUnicode}</Text>
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
  }
}

export default Article;
