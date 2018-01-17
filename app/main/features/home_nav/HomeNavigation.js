import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import CreatePlan from './home_screens/CreatePlan';
import CreatePlanBis from './home_screens/CreatePlan2';
import Home from './home_screens/Home';

export const HomeNavigation = StackNavigator({
    Home: {
	  screen: Home,
	  navigationOptions: {
        header : null,
      },
	},
    CreatePlan: {
	  screen: CreatePlan,
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
      initialRouteName: 'Home',
  },
 },

);

export default HomeNavigation;
