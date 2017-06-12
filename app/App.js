import React from 'react';

import {TabNavigator} from "react-navigation";

import IndexScreen from './screens/Index'
import SettingScreen from './screens/Setting'
import NotificationScreen from './screens/Notification'
import variablels from './styles/variablels'
import common from './styles/common'

const SymApp = TabNavigator({
    Index: {screen: IndexScreen},
    Notification: {screen: NotificationScreen},
    Setting: {screen: SettingScreen},
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: '#fff',
        inactiveTintColor: variablels.COLOR.fade,
        style: {
            backgroundColor: variablels.THEME.primary,
        },
        iconStyle: common.navgation
    },
});

export default SymApp