import React, { Component, PropTypes } from 'react';
import {
  View,
  Button
} from 'react-native';

import List from '../../components/list/index';
import { common, utils } from '../../styles';

class TagArticles extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  constructor(props) {
    super(props);
    this.state = {
      pathname: `${this.props.navigation.state.params.pathname}`
    };
  }

  _changeSort = (type) => {
    this.setState({
      pathname: `${this.props.navigation.state.params.pathname}${type}`
    });
  };

  render() {
    return (
      <View style={utils.flex}>
        <View style={common.sort}>
          <Button title={'默认'} onPress={() => this._changeSort('')} />
          <Button title={'热议'} onPress={() => this._changeSort('/hot')} />
          <Button title={'好评'} onPress={() => this._changeSort('/good')} />
          <Button title={'优选'} onPress={() => this._changeSort('/perfect')} />
          <Button title={'最近回帖'} onPress={() => this._changeSort('/reply')} />
        </View>
        <List navigation={this.props.navigation} pathname={this.state.pathname} />
      </View>);
  }
}

export default TagArticles;
