import React from 'react';
import {
    Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import ListScreen from './List';
import DetailScreen from './Detail';
import common from '../styles/common';


const IndexScreen = StackNavigator({
    List: { screen: ListScreen },
    Detail: { screen: DetailScreen },
});

IndexScreen.navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Image
            source={require('../images/article.png')}
            style={[{tintColor: tintColor}, common.navgation]}
        />
    )
}

export default IndexScreen;