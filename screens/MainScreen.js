import React from 'react';
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';
import HomeScreen from './HomeScreen';
import AnimalScreen from './AnimalScreen';

export default class MainScreen extends React.Component {
    render() {
        return <Nav />
    }
}

const Nav = StackNavigator({

  Cam: {
    screen: HomeScreen,
  },
      Info: {
    screen: AnimalScreen,
  },

});