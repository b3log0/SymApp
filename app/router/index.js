import React from 'react';
import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';
import {
  Image,
  Button
} from 'react-native';

import List from '../pages/List';
import Detail from '../pages//Detail';
import Navigation from '../pages/home/Navigation';
import Notification from '../pages/notifications/Index';
import { icon, color, theme } from '../styles';
import articlePng from '../images/article.png';
import feedPng from '../images/feed.png';
import settingPng from '../images/setting.png';

const IndexStack = StackNavigator({
  List: {
    screen: List,
    navigationOptions: {
      header: null,
      tabBarIcon: obj => (<Image
        source={articlePng}
        style={[icon.normal, { tintColor: obj.tintColor }]}
      />)
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({ navigation }) => {
      const { state, setParams } = navigation;
      const isInfo = state.params.mode === 'info';
      const { user } = state.params;
      return {
        title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
        tabBarVisible: false,
        headerRight: (
          <Button
            title={isInfo ? 'Done' : `${user}'s info`}
            onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })}
          />
        )
      };
    }
  }
});

const HomeStack = StackNavigator({
  Navigation: { screen: Navigation,
    navigationOptions: {
      tabBarIcon: obj => (
        <Image
          source={settingPng}
          style={[icon.normal, { tintColor: obj.tintColor }]}
        />
      )
    }
  },
  Detail: { screen: Detail }
});

const Root = TabNavigator({
  Index: { screen: IndexStack },
  Notification: { screen: Notification,
    navigationOptions: {
      showLabel: false,
      tabBarIcon: obj => (
        <Image
          source={feedPng}
          style={[icon.normal, { tintColor: obj.tintColor }]}
        />
      )
    }
  },
  Home: {
    screen: HomeStack
  }
}, {
  lazy: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: color.white,
    inactiveTintColor: color.fade,
    style: {
      backgroundColor: theme.primary
    },
    iconStyle: icon.normal
  }
});

export default Root;
