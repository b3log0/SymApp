import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';

import ComponentsList from '../../components/list/index';

@inject('entity')
@observer
class List extends Component {
  static propTypes = {
    entity: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  render() {
    const { entity } = this.props;
    console.log(entity.isLoading)
    return (
      <ComponentsList navigation={this.props.navigation} entity={entity} />
    );
  }
}

export default List;
