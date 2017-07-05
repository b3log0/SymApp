import React, { Component, PropTypes } from 'react';

import List from '../../components/list';

class Articles extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  render() {
    return (
      <List navigation={this.props.navigation} />
    );
  }
}

export default Articles;
