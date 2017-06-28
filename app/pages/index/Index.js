import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
import { inject, observer } from 'mobx-react';

import userAction from '../../actions/User';
import Login from '../verify/Login';
import List from '../../components/article/List';
import addfilePng from '../../images/addfile.png';
import { utils, index, icon } from '../../styles/index';

@inject('entity', 'user')
@observer
class Index extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { entity } = this.props;
    entity.setPathname('articles/latest');
    entity.setNavigation(this.props.navigation);
  }

  _goPost = () => {
    const { user } = this.props;
    userAction.isLogin().then((isLogin) => {
      if (isLogin) {
        this.props.navigation.navigate('IndexPost');
      } else {
        user.setShowLogin(true);
      }
    });
  };

  render() {
    const { user } = this.props;
    return (
      <View style={utils.statusBar}>
        <Modal visible={user.showLogin}>
          <Login />
        </Modal>
        <List />
        <TouchableOpacity
          onPress={this._goPost}
          style={index.addIconWrap}
        >
          <View >
            <Image style={[index.addIcon, icon.normal]} source={addfilePng} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Index;
