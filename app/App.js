import { TabNavigator } from 'react-navigation';

import IndexScreen from './pages/Index';
import SettingScreen from './pages/home/Index';
import NotificationScreen from './pages/notifications/Index';
import { icon, color, theme } from './styles';

const SymApp = TabNavigator({
  Index: { screen: IndexScreen },
  Notification: { screen: NotificationScreen },
  Setting: { screen: SettingScreen }
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

export default SymApp;
