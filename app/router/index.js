import React from 'react';
import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';
import {
  Image
} from 'react-native';

import IndexIndex from '../pages/index/Index';
import IndexPost from '../pages/home/Post';
import Web from '../components/Web';
import Other from '../pages/other/Index';
import NotificationNavigation from '../pages/notifications/Navigation';
import HomeNavigation from '../pages/home/Navigation';
import HomeSettingNavigation from '../pages/home/setting/SettingNavigation';
import HomeSettingHelp from '../pages/home/setting/Help';
import HomeArticles from '../pages/home/Articles';
import { icon, color, theme } from '../styles';
import articlePng from '../images/article.png';
import feedPng from '../images/feed.png';
import settingPng from '../images/setting.png';
import compassPng from '../images/compass.png';

const WebScreen = {
  screen: Web
};

const IndexStack = StackNavigator({
  IndexIndex: {
    screen: IndexIndex,
    navigationOptions: {
      header: null
    }
  },
  IndexPost: {
    screen: IndexPost,
    navigationOptions: {
      title: '发帖',
      tabBarVisible: false
    }
  },
  WebView: WebScreen
}, {
  headerMode: 'screen'
});

const HomeStack = StackNavigator({
  HomeNavigation: {
    screen: HomeNavigation,
    navigationOptions: {
      header: null
    }
  },
  HomeSettingNavigation: {
    screen: HomeSettingNavigation,
    navigationOptions: {
      title: '设置'
    }
  },
  HomeSettingHelp: {
    screen: HomeSettingHelp,
    navigationOptions: {
      title: '帮助'
    }
  },
  HomeArticles: {
    screen: HomeArticles
  },
  WebView: WebScreen
}, {
  headerMode: 'screen'
});

const NotificationsStack = StackNavigator({
  NotificationNavigation: {
    screen: NotificationNavigation,
    navigationOptions: {
      header: null
    }
  }
}, {
  headerMode: 'screen'
});

const Root = TabNavigator({
  Index: {
    screen: IndexStack,
    navigationOptions: {
      tabBarIcon: obj => (<Image
        source={articlePng}
        style={[icon.normal, { tintColor: obj.tintColor }]}
      />)
    }
  },
  Other: {
    screen: Other,
    navigationOptions: {
      tabBarIcon: obj => (<Image
        source={compassPng}
        style={[icon.normal, { tintColor: obj.tintColor }]}
      />)
    }
  },
  Notification: {
    screen: NotificationsStack,
    navigationOptions: {
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
  swipeEnabled: false,
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
