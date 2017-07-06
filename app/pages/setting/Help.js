import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import { module } from '../../styles/index';

class Help extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  _goView = (path) => {
    this.props.navigation.navigate('WebView', { path });
  };

  render() {
    return (
      <ScrollView>
        <View style={module.wrap}>
          <TouchableOpacity
            style={module.list}
            onPress={() => { this._goView('article/1440573175609'); }}
          >
            <Text>使用入门</Text>
            <Text style={module.listDesc}>HacPai 分别取 Hacker / Painter 的头三个字母组成</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => { this._goView('tag/user_guide'); }}
          >
            <Text>基础知识</Text>
            <Text style={module.listDesc}>包含了解 HacPai 所需的一切内容</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={module.list}
            onPress={() => { this._goView('article/1474030007391'); }}
          >
            <Text>键盘快捷键</Text>
            <Text style={module.listDesc}>通过某些特定的按键组合来代替鼠标完成一个操作</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[module.list, module.listLast]}
            onPress={() => { this._goView('guide/markdown'); }}
          >
            <Text>Markdown 教程</Text>
            <Text style={module.listDesc}>话说排版很重要，赶快上手吧</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

export default Help;
