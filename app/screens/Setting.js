import React, { Component } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';

class SettingScreen extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../images/setting.png')}
                style={[{tintColor: tintColor}]}
            />
        )
    };
    render() {
        return (
            <View>
                <Text>Setting</Text>
            </View>
        );
    }
}

export  default  SettingScreen;