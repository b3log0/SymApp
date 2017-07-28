import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { inject } from 'mobx-react';

import { list, common } from '../../../styles/index';

@inject('article')
class NotificationMsg extends Component {

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
      stackTitle: rowData.title
    });
  };

  render() {
    const rowData = this.props.rowData;
    return (
      <View style={list.normal}>
        <TouchableOpacity onPress={this._goComment}>
          <Text style={list.title}>{rowData.description}</Text>
          <View style={list.info} >
            <Image
              source={{ uri: rowData.thumbnailURL }}
              style={common.avatar}
            />
            <Text style={list.infoText}>
              {rowData.userName}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NotificationMsg;
