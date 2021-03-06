import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import UserIdentification from './log_in/UserIdentification';
import UserLoggedInNav from './features/UserLoggedInNav';
import LoggedInOrNot from './LoggedInOrNot';

global.path = 'http://www.gybels.tk/appliPP/php/';

export const App = StackNavigator({
    IsLoggedIn: {
        screen: LoggedInOrNot,
        navigationOptions: {
        header : null,
      },
    },
    LogIn: {
	  screen: UserIdentification,
	  navigationOptions: {
        header : null,
      },
	},
    UserLoggedIn: {
	  screen: ({ navigation}) =>
      <UserLoggedInNav screenProps={{rootNavigation: navigation}}/>,
	  navigationOptions: {
          header: null,
      },
	},
},{
    StackNavigatorConfig: {
        initialRouteName: 'IsLoggedIn',
    }
}
);

export default App;
