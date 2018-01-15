import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Seance from './Seance';
import AddSeance from './AddSeance';
import CalendarApp from './CalendarApp';
import ChoixZoneCorps from './ChoixZoneCorps.js';
import ChoixMuscle from './ChoixMuscle.js';
import ChoixMateriel from './ChoixMateriel.js';
import ChoixExercice from './ChoixExercice.js'

export const CalendarNavigation = StackNavigator({
    CalendarApp: {
	  screen:CalendarApp,
	  navigationOptions: {
        header : null,
      },
	},
    AddSeance: {
	  screen:AddSeance,
	  navigationOptions: {
        header : null,
      },
	},
    Seance: {
	  screen:Seance,
	  navigationOptions: {
        header : null,
      },
	},
	ChoixZoneCorps: {
		screen: ChoixZoneCorps,
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
	ChoixMateriel: {
		screen: ChoixMateriel,
		navigationOptions: {
        header : null,
      },
	},
  ChoixExercice: {
		screen: ChoixExercice,
		navigationOptions: {
        header : null,
      },
	}
},{
  StackNavigatorConfig: {
  },
 },

);

export default CalendarNavigation;
