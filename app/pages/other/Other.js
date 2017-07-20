import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Button,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { inject } from 'mobx-react';

import domainsAction from '../../actions/Domains';
import { utils, module, other } from '../../styles';

@inject('domain')
class Other extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    domain: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      domains: []
    };
  }

  async componentWillMount() {
    const domains = await domainsAction.getDomains();
    this.setState({
      domains: domains.domains
    });
  }

  _goDomains = (uri, stackTitle) => {
    const { domain } = this.props;
    domain.setData({
      uri,
      title: stackTitle
    });
    this.props.navigation.navigate('Domain', { stackTitle });
  };

  _goView = (path, injectJS, stackTitle) => {
    this.props.navigation.navigate('WebView', { path, injectJS, stackTitle });
  };

  render() {
    const domainsJSX = this.state.domains.map((item) => {
      const uriArray = item.domainURI.split('/');
      return (<Button
        key={item.oId}
        onPress={() => {
          this._goDomains(`${uriArray[uriArray.length - 1]}`, item.domainTitle);
        }}
        title={item.domainTitle}
      />);
    }
    );

    return (
      <ScrollView style={[utils.statusBar, utils.flex]}>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => { this._goView('activity/checkin'); }}
          >
            <Text>领取今日签到奖励</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => { this._goView('activity/yesterday-liveness-reward'); }}
          >
            <Text>领取昨日活跃奖励</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView(
                'activity/1A0001',
                `$('body').html($('.activity').html()).addClass('content activity');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                '上证博彩'
              );
            }}
          >
            <Text>上证博彩</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => {
              this._goView(
                'activity/character',
                `$('body').html($('.activity').html()).addClass('content activity');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                '字'
              );
            }}
          >
            <Text>字</Text>
          </TouchableOpacity>
        </View>
        <View style={other.domains}>
          {domainsJSX}
        </View>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView(
                'perfect',
                `$('body').html($('.content').html()).addClass('content');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                '优选'
              );
            }}
          >
            <Text>优选</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView(
                'city/my',
                `$('body').html($('.content').html()).addClass('content');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                '同城'
              );
            }}
          >
            <Text>同城</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this._goView(
                'timeline',
                `$('body').html($('.content').html()).addClass('content');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                '此刻'
              );
            }}
          >
            <Text>此刻</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this.props.navigation.navigate('TagArticles', { stackTitle: '书单', pathname: 'articles/tag/book_share' });
            }
            }
          >
            <Text>书单</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => {
              this.props.navigation.navigate('List', { stackTitle: '标签', pathname: 'tags' });
            }}
          >
            <Text>标签</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default Other;
