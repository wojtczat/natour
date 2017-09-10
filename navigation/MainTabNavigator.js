import React from 'react';
import { Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import MainScreen from '../screens/MainScreen';
import LinksScreen from '../screens/LinksScreen';

export default TabNavigator(
  {
    Camera: {
      screen: MainScreen,
    },
    Map: {
      screen: LinksScreen,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Camera':
            iconName = Platform.OS === 'ios'
              ? `ios-camera${focused ? '' : '-outline'}`
              : 'md-camera';
            break;
          case 'Map':
            iconName = Platform.OS === 'ios'
              ? `ios-map${focused ? '' : '-outline'}`
              : 'md-map';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
