import React, { Component } from 'react';
import { TabNavigator, } from 'react-navigation';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarNavigation from './calendar_nav/CalendarNavigation';
import Shop from './shop_nav/Shop';
import UserNavigation from './account_nav/UserNavigation';
import HomeNavigation from './home_nav/HomeNavigation';

export default class UserLoggedInNav extends Component{

  constructor(props){
      super(props);
      this.state = {
          isLoading: true,
          hasInternet: true,
          followsPlan: false,
      }
  }

  componentDidMount(){
    AsyncStorage.getItem('userId').then((value) => this.isFollowingPlan(value)).done();
  }

  isFollowingPlan(identifiant){
    return fetch(path + 'isFollowingPlan.php',
    {
        method: "POST",
        headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        body: JSON.stringify({
                id:  identifiant,
            })
    })
    .then((response) => response.json())
    .then((res) => {
        this.setState({
            isLoading: false,
            hasInternet: true,
            followsPlan: res,
        })
    })
    .catch((error) => {
      this.setState({
          hasInternet: false,
          isLoading: false,
      })
      this.isFollowingPlan(identifiant);
    });
  }

  render(){
    const UserLoggedIn = TabNavigator({
      HomeNav: {
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
      UserNav: {
    	  screen: UserNavigation,
    	  navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Icon name="user" size={25} />,
          },
    	},

    },
    {
      initialRouteName: this.state.followsPlan ? 'Calendar' : 'HomeNav',
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

    if(this.state.isLoading){
        return(
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size='large' color='rgb(125,125,125)'/>
            </View>
        );
    }

    if(!this.state.hasInternet){
        return(
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size='large' color='rgb(125,125,125)'/>

                <Text style={styles.textTitle}>
                Pas de connexion internet...
                </Text>
            </View>
        );
    }

    return(
      <UserLoggedIn screenProps={{rootNavigation: this.props.screenProps.rootNavigation}}/>
    );

  }
}

var styles = StyleSheet.create({
  textTitle:{
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      margin: 10
  },
});
