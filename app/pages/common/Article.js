import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Button,
  Modal,
  ActivityIndicator,
  WebView,
  Dimensions,
  View
} from 'react-native';
import { inject, observer } from 'mobx-react';

import List from '../../components/list';
import ownerAction from '../../actions/Owner';
import Login from '../../components/Login';
import { utils, color, article as articleStyle } from '../../styles';

@inject('article', 'owner')
@observer
class Article extends Component {
  static propTypes = {
    owner: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  constructor(props) {
    super(props);
    this.state = {
      height: Dimensions.get('window').height.toString(),
      pathname: `article/${this.props.navigation.state.params.oId}`
    };
  }

  componentWillMount() {
    const { article } = this.props;
    ownerAction.isLogin();
    article.setOId(this.props.navigation.state.params.oId);
  }

  _goUpdate = async () => {
    const { owner } = this.props;
    if (owner.isLogin) {
      this.props.navigation.navigate('MemberPost', { stackTitle: '更新' });
    } else {
      owner.setShowLogin(true);
    }
  };

  _onMessage = (e) => {
    this.setState({
      height: e.nativeEvent.data,
      scrollEnabled: true
    });
  };

  render() {
    const { article, owner } = this.props;

    const injectJS = `
    $("body").addClass("content-reset").html($(".article-content").last().html());
    $(window).ready(function () {
      postMessage($('body').height().toString());
    })`;

    const gestureHandlers = {
      onStartShouldSetResponder: () => true,
      onResponderGrant: () => {
        this.setState({ scrollEnabled: true });
      },
      onResponderTerminate: () => {
        this.setState({ scrollEnabled: false });
      }
    };

    return (
      <ScrollView {...gestureHandlers} scrollEnabled={this.state.scrollEnabled}>
        <Modal visible={owner.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        {
          (article.type !== 3 && owner.name === article.authorName) ?
            <Button title={'更新'} onPress={this._goUpdate} /> :
          null
        }
        <View style={{ backgroundColor: color.white }}>
          <WebView
            style={[{
              height: Math.floor(this.state.height)
            }, articleStyle.content]}
            scrollEnabled={false}
            renderLoading={() => <ActivityIndicator style={utils.verticalCenter} />}
            onMessage={this._onMessage}
            injectedJavaScript={injectJS}
            source={{ uri: `https://hacpai.com/article/${article.oId}` }}
          />
        </View>
        <List navigation={this.props.navigation} pathname={this.state.pathname} />
      </ScrollView>
    );
  }
}

export default Article;
