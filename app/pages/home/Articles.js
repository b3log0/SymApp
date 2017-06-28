import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';

import List from '../../components/article/List';

@inject('user')
class Articles extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props;
    return (
      <List navigation={this.props.navigation} pathname={`user/${user.name}/articles`} />
    );
  }
}

export default Articles;
