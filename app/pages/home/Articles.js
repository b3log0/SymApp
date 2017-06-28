import React, { PureComponent, PropTypes } from 'react';

import List from '../../components/article/List';

class Articles extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    return (
      <List navigation={this.props.navigation} />
    );
  }
}

export default Articles;
