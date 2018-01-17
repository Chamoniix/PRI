import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import UserIdentification from './UserIdentification';
import UserLoggedInNav from './UserLoggedInNav';

import Home from './Home';

export const HomeNavigation = StackNavigator({
    LogIn: {
      //screen : Home,
	  screen: UserIdentification,
	  navigationOptions: {
        header : null,
      },
	},
    UserLoggedIn: {
	  screen: UserLoggedInNav,
	  navigationOptions: {
        header : null,
      },
	},
},

);

export default HomeNavigation;
