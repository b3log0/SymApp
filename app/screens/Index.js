import React from 'react';
import {
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import ListScreen from './List';
import DetailScreen from './Detail';
import common from '../styles/common';
import articlePng from '../images/article.png';


const IndexScreen = StackNavigator({
  List: { screen: ListScreen },
  Detail: { screen: DetailScreen }
});

IndexScreen.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Image
      source={articlePng}
      style={[{ tintColor }, common.navgation]}
    />
  )
};

export default IndexScreen;
