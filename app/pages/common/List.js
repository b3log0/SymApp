import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ComponentsList from '../../components/list/index';

class List extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  render() {
    return (
      <ComponentsList
        navigation={this.props.navigation}
        pathname={this.props.navigation.state.params.pathname}
      />
    );
  }
}

export default List;
