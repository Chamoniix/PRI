import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import UserChoice from './identification_screens/UserChoice';
import UserLogin from './identification_screens/UserLogin';
import UserRegistration from './identification_screens/UserRegistration';
import UserRegistered from './identification_screens/UserRegistered';

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
    Registered: {
	  screen: UserRegistered,
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