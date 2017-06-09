import React from 'react';

import {TabNavigator} from "react-navigation";

import IndexScreen from './screens/index'
import SettingScreen from './screens/setting'
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

const SymApp = TabNavigator({
    Index: {screen: IndexScreen},
    Setting: {screen: SettingScreen},
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#e91e63'
    },
});

IndexScreen.navigationOptions = {
    title: 'My Chats',
};

class ListScreen extends React.Component {
    render() {
        return (
            <View  style={styles.container}>
                <Text>
                    Welcome to React Native!
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default SymApp