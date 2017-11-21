import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navigation from './Navigation';
import Seance from './Seance';

export const App = StackNavigator({
  Navigation: {
	  screen:Navigation,
	  navigationOptions: {
        header : null,
      },	  
	},
  Seance: {
	  screen: Seance,
	  navigationOptions: {
        //header : null,
		title: 'Seance',
      },
	},
},{
  StackNavigatorConfig: {
  },
 },
  
);

export default App;
