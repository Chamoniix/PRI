import React, { Component } from 'react';
import { TabNavigator, } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarNavigation from './calendar_nav/CalendarNavigation';
import Shop from './shop_nav/Shop';
import UserNavigation from './account_nav/UserNavigation';
import HomeNavigation from './home_nav/HomeNavigation';

import LaunchSeance from './calendar_nav/calendar_screens/LaunchSeance';

export default class UserLoggedInNav extends Component{

  render(){
    const UserLoggedIn = TabNavigator({
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
    	  //screen: Shop,
          screen: LaunchSeance,
    	  navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="shopping-cart" size={25} />,
          },
    	},
      User: {
    	  screen: UserNavigation,
    	  navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="user" size={25} />,
          },
    	},

    },
    {
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
    },
    );

    return(
      <UserLoggedIn screenProps={{rootNavigation: this.props.screenProps.rootNavigation}}/>
    );

  }
}
