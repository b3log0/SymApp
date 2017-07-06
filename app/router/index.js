import React from 'react';
import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';
import {
  Image
} from 'react-native';

import Web from '../components/Web';
import Article from '../pages/common/Article';
import List from '../pages/common/List';
import TagArticles from '../pages/common/TagArticles';
import Home from '../pages/home/Home';
import Other from '../pages/other/Other';
import OtherDomain from '../pages/other/Domain';
import Notifications from '../pages/notifications/Notifications';
import Member from '../pages/member/Member';
import MemberPost from '../pages/member/Post';
import Setting from '../pages/setting/Setting';
import SettingHelp from '../pages/setting/Help';
import { icon, color, theme } from '../styles';
import articlePng from '../images/article.png';
import feedPng from '../images/feed.png';
import settingPng from '../images/setting.png';
import compassPng from '../images/compass.png';

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  MemberPost: {
    screen: MemberPost
  },
  WebView: {
    screen: Web
  },
  Article: {
    screen: Article
  }
}, {
  headerMode: 'screen'
});

const MemberStack = StackNavigator({
  Member: {
    screen: Member,
    navigationOptions: {
      header: null
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      title: '设置'
    }
  },
  SettingHelp: {
    screen: SettingHelp,
    navigationOptions: {
      title: '帮助'
    }
  },
  List: {
    screen: List
  },
  WebView: {
    screen: Web
  },
  Article: {
    screen: Article
  },
  MemberPost: {
    screen: MemberPost
  },
  TagArticles: {
    screen: TagArticles
  }
}, {
  headerMode: 'screen'
});

const NotificationsStack = StackNavigator({
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      header: null
    }
  }
}, {
  headerMode: 'screen'
});

const OtherStack = StackNavigator({
  Other: {
    screen: Other,
    navigationOptions: {
      header: null
    }
  },
  Domain: {
    screen: OtherDomain
  },
  List: {
    screen: List
  },
  WebView: {
    screen: Web
  },
  Article: {
    screen: Article
  },
  TagArticles: {
    screen: TagArticles
  },
  MemberPost: {
    screen: MemberPost
  }
}, {
  headerMode: 'screen'
});

const Root = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarIcon: obj => (<Image
        source={articlePng}
        style={[icon.normal, { tintColor: obj.tintColor }]}
      />)
    }
  },
  Other: {
    screen: OtherStack,
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
  Member: {
    screen: MemberStack,
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
    activeTintColor: theme.primary,
    inactiveTintColor: color.fade,
    style: {
      backgroundColor: color.white,
      borderTopColor: color.fade,
      borderTopWidth: 0.5
    },
    iconStyle: icon.normal,
    indicatorStyle: {
      height: 0
    }
  }
});

export default Root;
