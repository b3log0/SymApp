import { TabNavigator } from 'react-navigation';

import IndexScreen from './pages/Index';
import SettingScreen from './pages/home/Index';
import NotificationScreen from './pages/notifications/Index';
import variablels from './styles/variables';
import { icon } from './styles';

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
    activeTintColor: '#fff',
    inactiveTintColor: variablels.COLOR.fade,
    style: {
      backgroundColor: variablels.THEME.primary
    },
    iconStyle: icon.normal
  }
});

export default SymApp;
