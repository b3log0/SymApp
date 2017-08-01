import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import ownerAction from '../../actions/Owner';
import { module } from '../../styles';

class SettingNavigation extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  _goView = (routerName) => {
    this.props.navigation.navigate(routerName);
  };

  _logout = async () => {
    const sc = await ownerAction.logout();
    if (sc === 0) {
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings',
                injectJS: `$('body').html($('.module-panel').html()).addClass('module-panel form');
                $('html').css({
                  'background-color': '#fff'
                });`,
                stackTitle: '基本信息'
              });
            }}
          >
            <Text>基本信息</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings/avatar',
                injectJS: `$('body').html($('.module-panel').html()).addClass('module-panel form');
                $('html').css({
                  'background-color': '#fff'
                });`,
                stackTitle: '头像'
              });
            }}
          >
            <Text>头像</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings/password',
                injectJS: `$('body').html($('.module-panel').html()).addClass('module-panel form');
                $('html').css({
                  'background-color': '#fff'
                });`,
                stackTitle: '密码'
              });
            }}
          >
            <Text>密码</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings/function',
                injectJS: `$('body').html($('.main .wrapper').html()).addClass('main');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                stackTitle: '功能'
              });
            }}
          >
            <Text>功能</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings/location',
                injectJS: `$('body').html($('.module-panel').html()).addClass('module-panel form');
                $('html').css({
                  'background-color': '#fff'
                });`,
                stackTitle: '位置'
              });
            }}
          >
            <Text>位置</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings/privacy',
                injectJS: `$('body').html($('.main .wrapper').html()).addClass('main');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                stackTitle: '隐私'
              });
            }}
          >
            <Text>隐私</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings/data',
                injectJS: `$('body').html($('.main .wrapper').html()).addClass('main');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                stackTitle: '数据'
              });
            }}
          >
            <Text>数据</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings/invite',
                injectJS: `$('body').html($('.main .wrapper').html()).addClass('main');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                stackTitle: '邀请'
              });
            }}
          >
            <Text>邀请</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings/point',
                injectJS: `$('body').html($('.main .wrapper').html()).addClass('main');
                $('.ft-green').remove();
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                stackTitle: '积分'
              });
            }}
          >
            <Text>积分</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings/i18n',
                injectJS: `$('body').html($('.main .wrapper').html()).addClass('main');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                stackTitle: '国际化'
              });
            }}
          >
            <Text>国际化</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'settings/i18n',
                injectJS: `$('body').html($('.main .wrapper').html()).addClass('main');
                $('html').css({
                  'background-color': '#fff',
                  'padding': '10px'
                });`,
                stackTitle: 'B3'
              });
            }}
          >
            <Text>B3</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => { this._goView('SettingHelp'); }}
          >
            <Text>帮助</Text>
          </TouchableOpacity>
        </View>
        <View style={module.wrap}>
          <TouchableOpacity style={[module.list, module.listLast]} onPress={this._logout}>
            <Text>登出</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default SettingNavigation;
