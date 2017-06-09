import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListScreen from './list';
import DetailScreen from './detail';

const IndexScreen = StackNavigator({
    List: { screen: ListScreen },
    Detail: { screen: DetailScreen },
});

export default IndexScreen;