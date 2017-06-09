import React from 'react';

import {TabNavigator} from "react-navigation";

import IndexScreen from './screens/Index'
import SettingScreen from './screens/Setting'
import NotificationScreen from './screens/Notification'
import Style from './styles/variablels'

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