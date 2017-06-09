import React from 'react';
import {
    Text,
    View
} from 'react-native';

class SettingScreen extends React.Component {
    static navigationOptions = {
        title: 'Setting',
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