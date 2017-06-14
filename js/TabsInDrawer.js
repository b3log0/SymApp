/**
 * @flow
 */

import React from 'react';
import { Text, Platform, ScrollView, StyleSheet } from 'react-native';
import { TabNavigator, DrawerNavigator } from 'react-navigation';
import SimpleTabs from './SimpleTabs';
import StacksOverTabs from './StacksOverTabs';

const TabsInDrawer = DrawerNavigator({
  SimpleTabs: {
    screen: SimpleTabs,
    navigationOptions: {
      drawer: () => ({
        label: 'Simple Tabs',
        icon: ({ tintColor }) => (
          <Text style={{ color: tintColor }}>filter-1</Text>
        )
      })
    }
  },
  StacksOverTabs: {
    screen: StacksOverTabs,
    navigationOptions: {
      drawer: () => ({
        label: 'Stacks Over Tabs',
        icon: ({ tintColor }) => (
          <Text style={{ color: tintColor }}>filter-2</Text>
        )
      })
    }
  }
});

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0
  }
});

export default TabsInDrawer;
