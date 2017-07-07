import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import { inject } from 'mobx-react';

import tagsPng from '../../../images/tags.png';
import { list, common } from '../../../styles/index';

@inject('tags', 'tag')
class Tag extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    tags: PropTypes.object.isRequired,
    tag: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goTag = () => {
    const { tags, tag } = this.props;
    const rowData = this.props.rowData;
    const uriArray = rowData.tagURI.split('/');
    const tagUri = uriArray[uriArray.length - 1];
    tag.setUri(tagUri);
    tags.setPathname(`articles/tag/${tagUri}`);
    this.props.navigation.navigate('TagArticles', { stackTitle: rowData.tagTitle });
  };

  render() {
    const rowData = this.props.rowData;
    return (
      <View style={list.normal}>
        <TouchableOpacity onPress={this._goTag} style={list.row}>
          <View style={list.rowFirst}>
            <Image
              source={rowData.tagIconPath === '' ? tagsPng : { uri: rowData.tagIconPath }}
              style={common.avatarBig}
            />
          </View>
          <View stlye={list.rowCenter}>
            <Text style={[list.title, list.rowTitle]}>{rowData.tagTitle}</Text>
            <Text style={list.infoText}>
              {`引用 ${rowData.tagReferenceCount}   回帖 ${rowData.tagCommentCount}`}
            </Text>
          </View>
          <View style={list.rowLast}>
            <Button
              onPress={() => {
                Alert.alert('开发中');
              }}
              title={'取消关注'}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Tag;
