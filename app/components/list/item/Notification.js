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
class Notification extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goComment = () => {
    const { rowData, article } = this.props;
    article.preSet({
      oId: rowData.dataId,
      authorName: rowData.authorName
    });
    this.props.navigation.navigate('Article', {
      oId: rowData.dataId,
      stackTitle: rowData.titleEmojUnicode
    });
  };

  render() {
    const rowData = this.props.rowData;
    return (
      <View style={[list.normal, rowData.hasRead ? list.read : '']}>
        <TouchableOpacity onPress={this._goComment}>
          <Text style={list.title}>{rowData.titleEmojUnicode}</Text>
          <View style={list.info} >
            <Image
              source={{ uri: rowData.authorAvatarURL }}
              style={common.avatar}
            />
            <Text style={list.infoText}>
              {rowData.authorName}
            </Text>
          </View>
          <HTML
            html={rowData.content}
            onLinkPress={url => this.props.navigation.navigate('WebView', { path: url })}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Notification;
