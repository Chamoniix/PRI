/*import React, { Component } from 'react';
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

export default UserNavigation;*/

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'IsLoggedIn'})
  ]
})

export default class Navigation extends Component<{}> {

    logOff(){
        AsyncStorage.setItem('userId', 'null');
        this.props.screenProps.rootNavigation.dispatch(resetAction);
    }

    render() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Welcome to User Account!
            </Text>
            <TouchableHighlight onPress={() => this.logOff()}>
                <Text>Se déconnecter</Text>
            </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
