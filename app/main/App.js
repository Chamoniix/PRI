import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navigation from './Navigation';
import Seance from './Seance';
import ChoixExercice from './ChoixExercice.js';

export const App = StackNavigator({
  Navigation: {
	  screen:Navigation,
	  navigationOptions: {
        header : null,
      },	  
	},
  ChoixExercice: {
    screen: ChoixExercice,
    navigationOptions: {
      title: 'Exercice',
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
