import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { inject } from 'mobx-react';

import { module } from '../../styles/index';

@inject('article')
class Help extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired
  };

  render() {
    return (
      <ScrollView>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              const { article } = this.props;
              article.preSet({
                oId: '1440573175609',
                authorName: '88250',
                type: 0
              });
              this.props.navigation.navigate('Article', {
                oId: '1440573175609',
                stackTitle: '使用入门'
              });
            }}
          >
            <Text>使用入门</Text>
            <Text style={module.listDesc}>HacPai 分别取 Hacker / Painter 的头三个字母组成</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              this.props.navigation.navigate('TagArticles', {
                stackTitle: '基础知识',
                pathname: 'articles/tag/user_guide'
              });
            }}
          >
            <Text>基础知识</Text>
            <Text style={module.listDesc}>包含了解 HacPai 所需的一切内容</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => {
              const { article } = this.props;
              article.preSet({
                oId: '1474030007391',
                authorName: 'Vanessa',
                type: 0
              });
              this.props.navigation.navigate('Article', {
                oId: '1474030007391',
                stackTitle: '键盘快捷键'
              });
            }}
          >
            <Text>键盘快捷键</Text>
            <Text style={module.listDesc}>通过某些特定的按键组合来代替鼠标完成一个操作</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => {
              this.props.navigation.navigate('WebView', {
                path: 'guide/markdown',
                injectJS: `$('body').html($('.main').html()).addClass('main');
                $('.main > .wrapper').remove()
                $('html').css({
                  'background-color': '#fff'
                });`,
                stackTitle: 'Markdown 教程'
              });
            }}
          >
            <Text>Markdown 教程</Text>
            <Text style={module.listDesc}>话说排版很重要，赶快上手吧</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default Help;
