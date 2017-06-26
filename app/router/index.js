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
import Article from '../pages/Article';
import Other from '../pages/other/Index';
import NotificationNavigation from '../pages/notifications/Navigation';
import HomeNavigation from '../pages/home/Navigation';
import HomeSettingNavigation from '../pages/home/SettingNavigation';
import Login from '../pages/verify/Login';
import { icon, color, theme } from '../styles';
import articlePng from '../images/article.png';
import feedPng from '../images/feed.png';
import settingPng from '../images/setting.png';
import compassPng from '../images/compass.png';

const IndexStack = StackNavigator({
  List: {
    screen: List,
    navigationOptions: {
      header: null
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
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
}, {
  headerMode: 'screen'
});

const NotificationsStack = StackNavigator({
  NotificationNavigation: {
    screen: NotificationNavigation,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
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
