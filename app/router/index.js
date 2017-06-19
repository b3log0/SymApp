import React from 'react';
import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';
import {
  Image,
  Button
} from 'react-native';

import userAction from '../actions/User';
import List from '../pages/List';
import Article from '../pages/Article';
import Navigation from '../pages/home/Navigation';
import Notification from '../pages/notifications/Index';
import Login from '../pages/verify/Login';
import HomeStack from '../pages/home/HomeStack';
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
  Article: {
    screen: Article,
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

// const HomeStack = StackNavigator({
//   Navigation: {
//     screen: Navigation
//   },
//   Login: {
//     screen: Login,
//     navigationOptions: {
//       header: null,
//       tabBarVisible: false
//     }
//   },
//   Article: { screen: Article }
// }, {
//   initialRouteName: () => {
//     userAction.isLogin().then(isLogin => isLogin ? 'Navigation' : 'Login');
//   }
// });

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
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: obj => (
        <Image
          source={settingPng}
          style={[icon.normal, { tintColor: obj.tintColor }]}
        />
      )
    }
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
    iconStyle: icon.normal,
    indicatorStyle: {
      height: 0
    }
  }
});

export default Root;
