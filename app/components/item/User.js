import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';

import { list } from '../../styles';

class User extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goUser = () => {
    const rowData = this.props.rowData;
    this.props.navigation.navigate('WebView', { path: `member/${rowData.userName}` });
  };

  render() {
    const rowData = this.props.rowData;
    let userDesc = `帖子 ${rowData.userArticleCount}   标签 ${rowData.userTagCount}`;
    if (rowData.userArticleCount === 0) {
      if (rowData.userURL !== '') {
        userDesc = rowData.userURL;
      } else {
        userDesc = `黑客派 ${rowData.userNo} 号会员`;
      }
    }

    return (
      <View style={list.normal}>
        <TouchableOpacity onPress={this._goUser} style={list.row}>
          <View style={list.rowFirst}>
            <Image
              source={{ uri: rowData.userAvatarURL48 }}
              style={list.avatarBig}
            />
          </View>
          <View stlye={list.rowCenter}>
            <Text style={[list.title, list.rowTitle]}>{rowData.userName}</Text>
            <Text style={list.infoText}>
              {userDesc}
            </Text>
          </View>
          <View style={list.rowLast}>
            <Button
              onPress={() => {
                Alert.alert('开发中');
              }}
              title={'...'}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default User;
