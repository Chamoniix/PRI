import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Seance from './Seance';
import CreatePlan from './CreatePlan';
import CreatePlanBis from './CreatePlan2';
import Home from './Home';
import ChoixExercice from './ChoixExercice.js';

export const App = StackNavigator({
    Home: {
	  //screen:Home,
      screen:ChoixExercice,
	  navigationOptions: {
        header : null,
      },	  
	},
    CreatePlan: {
	  screen:CreatePlan,
	  navigationOptions: {
        header : null,
      },	  
	},
    CreatePlanBis: {
	  screen: CreatePlanBis,
	  navigationOptions: {
        header : null,
      },
	},
},{
  StackNavigatorConfig: {
  },
 },
  
);

export default App;