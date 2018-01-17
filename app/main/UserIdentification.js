import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import UserChoice from './UserChoice';
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';

export const UserIdentification = StackNavigator({  
    Choice: {
	  screen: UserChoice,
	  navigationOptions: {
        header : null,
      },
	},
    Login: {
	  screen: UserLogin,
	  navigationOptions: {
        header : null,
      },
	},
    Register: {
	  screen: UserRegistration,
	  navigationOptions: {
        header : null,
      },
	},
},{
  StackNavigatorConfig: {
      initialRouteName: 'Choice',
  },
},
);

export default UserIdentification;