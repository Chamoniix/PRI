import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Seance from './Seance';
import AddSeance from './AddSeance';
import CalendarApp from './CalendarApp';

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
},{
  StackNavigatorConfig: {
  },
 },
  
);

export default CalendarNavigation;