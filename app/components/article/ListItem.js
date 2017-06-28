import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { inject } from 'mobx-react';

import { utils, list } from '../../styles';

@inject('entity')
class ListItem extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    rowData: PropTypes.object.isRequired
  };

  _goArticle = () => {
    const { entity } = this.props;
    const rowData = this.props.rowData;
    entity.navigation.navigate('Article', { oId: rowData.oId });
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
  }
}

export default ListItem;
