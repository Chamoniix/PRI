import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Seance from './Seance';
import CreatePlan from './CreatePlan';
import CreatePlanBis from './CreatePlan2';
import Home from './Home';
import ChoixZoneCorps from './ChoixZoneCorps.js';
import ChoixMuscle from './ChoixMuscle.js';
import Materiel from './ChoixMateriel.js';

import New from './New';

export const App = StackNavigator({
    Home: {
	  screen:Home,
      // screen:New,
	  // screen:Home,
      //screen:ChoixZoneCorps,
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
	ChoixMuscle: {
		screen: ChoixMuscle,
		navigationOptions: {
        header : null,
      },
	},
	Materiel: {
		screen: Materiel,
		navigationOptions: {
        header : null,
      },
	}
},{
  StackNavigatorConfig: {
      initialRouteName: 'Home',
  },
 },
  
);

export default App;