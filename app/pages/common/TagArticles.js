import React, { Component, PropTypes } from 'react';
import {
  View,
  Button
} from 'react-native';
import { inject } from 'mobx-react';

import List from '../../components/list/index';
import ListAction from '../../actions/List';
import { common, utils } from '../../styles';

@inject('tags', 'tag')
class TagArticles extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    tags: PropTypes.object.isRequired,
    tag: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  _changeSort = (type) => {
    const { tags, tag } = this.props;
    tags.setPathname(`articles/tag/${tag.uri}${type}`);
    tags.setList([]);
    tags.setPage(0, 0);
    ListAction.getList(1);
  };

  render() {
    const { tags } = this.props;
    return (
      <View style={utils.flex}>
        <View style={common.sort}>
          <Button title={'默认'} onPress={() => this._changeSort('')} />
          <Button title={'热议'} onPress={() => this._changeSort('/hot')} />
          <Button title={'好评'} onPress={() => this._changeSort('/good')} />
          <Button title={'优选'} onPress={() => this._changeSort('/perfect')} />
          <Button title={'最近回帖'} onPress={() => this._changeSort('/reply')} />
        </View>
        <List navigation={this.props.navigation} entity={tags} />
      </View>);
  }
}

export default TagArticles;
