import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { inject } from 'mobx-react';

import { list } from '../../../styles/index';

@inject('article')
class NotificationMsg extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goComment = () => {
    const { rowData, article } = this.props;
    const id = /href="\/article\/(\d{13})"/.exec(rowData.content)[1];
    article.preSet({
      oId: id,
      authorName: rowData.authorName
    });
    this.props.navigation.navigate('Article', {
      oId: id,
      stackTitle: rowData.title
    });
  };

  render() {
    const rowData = this.props.rowData;
    return (
      <View style={list.normal}>
        <TouchableOpacity onPress={this._goComment}>
          <View style={list.info}>
            <Image
              source={{ uri: rowData.authorAvatarURL }}
              style={list.infoAvatar}
            />
            <Text style={list.title}>
              {rowData.content.replace(/<\/a>/g, '').replace(/<a href="\S+">/g, '')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NotificationMsg;
