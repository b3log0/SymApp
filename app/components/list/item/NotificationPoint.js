import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { inject } from 'mobx-react';

import { list } from '../../../styles/index';

@inject('article')
class NotificationPoint extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goComment = () => {
    const { rowData, article } = this.props;
    const execResult = /\/article\/(\d+)"/.exec(rowData.content);
    if (execResult) {
      const id = execResult[1];
      article.preSet({
        oId: id,
        authorName: rowData.authorName
      });
      this.props.navigation.navigate('Article', {
        oId: id,
        stackTitle: /<a href="\/article\/\d{13}">(.+)<\/a>/.exec(rowData.content)[1]
      });
    } else {
      this.props.navigation.navigate('Member', { name: /\/member\/(\w+)"/.exec(rowData.content)[1] });
    }
  };

  render() {
    const rowData = this.props.rowData;
    return (
      <View style={list.normal}>
        <TouchableOpacity onPress={this._goComment}>
          <Text style={list.title}>
            {rowData.content.replace(/<\/a>/g, '').replace(/<a href="\S+">/g, '')
              .replace('<font style="color: red;">', '').replace('</font>', '')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default NotificationPoint;
