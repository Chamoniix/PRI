import React, { Component } from 'react';
import { TabNavigator, } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Home';
import CalendarNavigation from './CalendarNavigation';
import Shop from './Shop';
import User from './User';
import HomeNavigation from './HomeNavigation';

global.path = 'http://213.32.66.63/appliPP/'

export const App = TabNavigator({
  Home: {
      screen: HomeNavigation,
	   navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name='home' size={25} />,
      },
	},
  Calendar: {
	  screen: CalendarNavigation,
	  navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="calendar" size={25} />,
      },
	},
  Shop: {
	  screen: Shop,
	  navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="shopping-cart" size={25} />,
      },
	},
  User: {
	  screen: User,
	  navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="user" size={25} />,
      },
	},
  
}
,{
  tabBarOptions: {
    showIcon: true,
	showLabel : false,
    indicatorStyle: {
          backgroundColor: 'rgb(125,125,125)',
          height: 60,
      },
	style: {
		backgroundColor: 'rgb(217,217,217)',
	},
  },
},);

export default App;
