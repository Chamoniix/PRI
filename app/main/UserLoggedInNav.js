import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import CreatePlan from './CreatePlan';
import CreatePlanBis from './CreatePlan2';
import Home from './Home';

export const UserLoggedInNav = StackNavigator({
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

export default UserLoggedInNav;