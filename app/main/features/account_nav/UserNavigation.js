import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import User from './account_screens/User';

export const UserNavigation = StackNavigator({
    User: {
	  screen: User,
	  navigationOptions: {
        header : null,
      },
	},
},{
  StackNavigatorConfig: {
      initialRouteName: 'User',
  },
 },

);

export default UserNavigation;
