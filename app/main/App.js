import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import UserIdentification from './UserIdentification';
import UserLoggedInNav from './UserLoggedInNav';

global.path = 'http://213.32.66.63/appliPP/'

export const App = StackNavigator({
    LogIn: {
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

export default App;
