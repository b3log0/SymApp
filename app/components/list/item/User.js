import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';
import { inject } from 'mobx-react';

import { list, common } from '../../../styles/index';

@inject('member', 'owner')
class User extends Component {

  static propTypes = {
    rowData: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  _goUser = () => {
    const { rowData } = this.props;
    this.props.navigation.navigate('Member', { name: rowData.userName });
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
              style={common.avatarBig}
            />
          </View>
          <View stlye={list.rowCenter}>
            <Text style={[list.title, list.rowTitle]}>{rowData.userName}</Text>
            <Text style={list.infoText}>
              {userDesc}
            </Text>
          </View>
          {
            typeof (rowData.isFollowing) === 'undefined' ? null :
            (<View style={list.rowLast}>
              <Button
                onPress={() => {
                  Alert.alert('开发中');
                }}
                title={rowData.isFollowing ? '取消关注' : '关注'}
              />
            </View>)
          }
        </TouchableOpacity>
      </View>
    );
  }
}

export default User;
