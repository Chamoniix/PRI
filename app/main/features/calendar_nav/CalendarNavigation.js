import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Seance from './calendar_screens/Seance';
import AddSeance from './calendar_screens/AddSeance';
import CalendarApp from './calendar_screens/CalendarApp';
import ChoixZoneCorps from './calendar_screens/ChoixZoneCorps.js';
import ChoixMuscle from './calendar_screens/ChoixMuscle.js';
import ChoixMateriel from './calendar_screens/ChoixMateriel.js';
import ChoixExercice from './calendar_screens/ChoixExercice.js'
import FinSeance from './calendar_screens/FinSeance.js'
import LaunchSeance from './calendar_screens/LaunchSeance.js'

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
	},
  LaunchSeance: {
		screen: LaunchSeance,
		navigationOptions: {
        header : null,
      },
	},
  FinSeance: {
		screen: FinSeance,
		navigationOptions: {
        header : null,
      },
	},
},{
  StackNavigatorConfig: {
  },
 },

);

export default CalendarNavigation;
