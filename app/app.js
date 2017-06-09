import React from 'react';

import {TabNavigator} from "react-navigation";

import IndexScreen from './screens/index'
import SettingScreen from './screens/setting'
import NotificationScreen from './screens/notification'
import Style from './style/variablels'

const SymApp = TabNavigator({
    Index: {screen: IndexScreen},
    Notification: {screen: NotificationScreen},
    Setting: {screen: SettingScreen},
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showLabel: false,
        activeTintColor: '#fff',
        inactiveTintColor: Style.COLOR.fade,
        style: {
            backgroundColor: Style.THEME.primary,
        },
    },
});

export default SymApp