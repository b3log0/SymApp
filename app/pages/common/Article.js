import React, { Component, PropTypes } from 'react';
import {
  Text
} from 'react-native';
import { inject, observer } from 'mobx-react';

import articleAction from '../../actions/Article';

@inject('article')
@observer
class Article extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.articleType,
    tabBarVisible: false
  });

  componentWillMount() {
    const { article } = this.props;
    article.setOId(this.props.navigation.state.params.oId);
    articleAction.getDetail(1);
  }

  render() {
    const { article } = this.props;

    return (<Text>{article.content}</Text>);
  }
}

export default Article;
