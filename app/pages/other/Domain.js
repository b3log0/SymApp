import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { inject } from 'mobx-react';

import domainsAction from '../../actions/Domains';
import { module } from '../../styles';

@inject('domain')
class Domain extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    domain: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }

  async componentWillMount() {
    const { domain } = this.props;
    const tags = await domainsAction.getTagsByDomain(domain.uri);
    this.setState({
      tags: tags.domain.domainTags
    });
  }

  _goArticles = (uri, stackTitle) => {
    const uriArray = uri.split('/');
    if (uriArray.length > 1) {
      const tagUri = uriArray[uriArray.length - 1];
      this.props.navigation.navigate('TagArticles', { stackTitle, pathname: `articles/tag/${tagUri}` });
    } else {
      this.props.navigation.navigate('List', { stackTitle, pathname: `articles/domain/${uri}` });
    }
  };

  render() {
    const tagsJSX = this.state.tags.map(item => (
      <TouchableOpacity
        key={item.oId}
        style={module.list}
        onPress={() => this._goArticles(item.tagURI, `${item.tagTitle}`)}
      >
        <Text>{item.tagTitle}</Text>
      </TouchableOpacity>
    ));

    const { domain } = this.props;

    return (
      <ScrollView>
        <View style={module.wrap}>
          {tagsJSX}
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => this._goArticles(domain.uri, '全部')}
          >
            <Text>全部</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default Domain;
