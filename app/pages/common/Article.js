import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Button,
  Modal
} from 'react-native';
import { inject, observer } from 'mobx-react';

import articleAction from '../../actions/Article';
import userAction from '../../actions/User';
import Login from '../../components/Login';

@inject('article', 'user')
@observer
class Article extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  componentWillMount() {
    const { article } = this.props;
    userAction.isLogin();
    article.setOId(this.props.navigation.state.params.oId);
    articleAction.getDetail(1);
  }

  _goUpdate = async () => {
    const { user } = this.props;
    if (user.isLogin) {
      this.props.navigation.navigate('MemberPost', { stackTitle: '更新' });
    } else {
      user.setShowLogin(true);
    }
  };

  render() {
    const { article, user } = this.props;

    return (
      <View>
        <Modal visible={user.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        {
          (article.type !== 3 && user.name === article.authorName) ?
            <Button title={'更新'} onPress={this._goUpdate} /> :
          null
        }
        <Text>{article.content}</Text>
      </View>
    );
  }
}

export default Article;
