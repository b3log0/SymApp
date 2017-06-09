import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';

class NotificationScreen extends Component {
    static navigationOptions = {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../images/feed.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu a
                </Text>
                <Button
                    onPress={() =>  this.props.navigation.navigate('Detail', { user: 'Vanessa' })}
                    title="Chat with Lucy"
                />
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

export default NotificationScreen;