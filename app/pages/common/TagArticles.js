import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity
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
          <TouchableOpacity
            style={[
              common.sortItem,
              this.state.pathname === `${this.props.navigation.state.params.pathname}`
                ? common.sortItemTextCurrent : ''
            ]}
            onPress={() => this._changeSort('')}
          >
            <Text style={common.sortItemText}>默认</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              common.sortItem,
              this.state.pathname === `${this.props.navigation.state.params.pathname}/hot`
                ? common.sortItemTextCurrent : ''
            ]}
            onPress={() => this._changeSort('/hot')}
          >
            <Text style={common.sortItemText}>热议</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              common.sortItem,
              this.state.pathname === `${this.props.navigation.state.params.pathname}/good`
                ? common.sortItemTextCurrent : ''
            ]}
            onPress={() => this._changeSort('/good')}
          >
            <Text style={common.sortItemText}>好评</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              common.sortItem,
              this.state.pathname === `${this.props.navigation.state.params.pathname}/perfect`
                ? common.sortItemTextCurrent : ''
            ]}
            onPress={() => this._changeSort('/perfect')}
          >
            <Text style={common.sortItemText}>优选</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              common.sortItem,
              this.state.pathname === `${this.props.navigation.state.params.pathname}/reply`
                ? common.sortItemTextCurrent : ''
            ]}
            onPress={() => this._changeSort('/reply')}
          >
            <Text style={common.sortItemText}>最近回帖</Text>
          </TouchableOpacity>
        </View>
        <List navigation={this.props.navigation} pathname={this.state.pathname} />
      </View>);
  }
}

export default TagArticles;
